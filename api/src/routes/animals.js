import express from 'express';
import animalsController from '../controllers/animalsController.js';
import checkTonken from '../authentication/token.js';

const router = express.Router();

router
  .get('/animals', animalsController.getAnimals);

export default router;
