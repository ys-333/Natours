const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

//checking id
exports.checkId = (req, res, next, val) => {
  console.log(req.body);
  if (val > tours.length) {
    return res.status(404).json({
      status: 'failed',
    });
  }
  next();
};
// checking body
exports.checkBody = (req, res, next) => {
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('price')) {
    return res.status(400).json({
      status: 'error',
      message: 'check input contains name and price',
    });
  }
  next();
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.currentTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  let { id } = req.params;
  id = id * 1; //convert it to integer
  const tour = tours.find((el) => el.id === id);

  // validation

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  let { id } = req.params;
  id = id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  let { id } = req.params;
  id = id * 1;

  const newTours = tours.filter((el) => el.id !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        results: newTours.length,
        data: {
          newTours,
        },
      });
    }
  );
};

exports.postTour = (req, res) => {
  //   console.log(req.body);
  //   console.log(tours);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  //   now updating our tours-simple.json
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  //   res.end();
};
