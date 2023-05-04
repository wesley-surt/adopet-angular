import express from 'express';
import ProfilesController from '../controllers/profilesController.js';
import checkToken from '../authentication/token.js';

const router = express.Router();

router
  .get('/profile/:id', checkToken, ProfilesController.getProfile)
  .post('/profile/register', ProfilesController.register);

export default router;
