import express from 'express';
import animalsController from '../controllers/animalsController.js';
import checkTonken from '../authentication/token.js';

const router = express.Router();

router
  .get('/animals', animalsController.getAllAnimals)
  .get('/animals/:id', animalsController.getAnimal);

export default router;
