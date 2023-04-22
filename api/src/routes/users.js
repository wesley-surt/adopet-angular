import express from 'express';
import UsersController from '../controllers/usersController.js';
import checkTonken from '../authentication/token.js';

const router = express.Router();

router
  .get('/users/:id', checkTonken, UsersController.userQuery)
  .post('/users/login', UsersController.confirmsUser)
  .post('/users/register', UsersController.registerUser)

export default router;
