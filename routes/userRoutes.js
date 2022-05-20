const express = require('express');
const userControllers = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userControllers.getUser).post(userControllers.postUser);
router
  .route('/:id')
  .get(userControllers.getUserById)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
