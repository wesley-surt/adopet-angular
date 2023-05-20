import express from 'express';
import ProfilesController from '../controllers/profilesController.js';
import checkToken from '../authentication/token.js';

const router = express.Router();

router
  .get('/profile/:id', checkToken, ProfilesController.getProfile)
  .post('/profile/register', ProfilesController.register)
  .put('/profile/update', ProfilesController.update);

export default router;
