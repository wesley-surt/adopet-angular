import express from 'express';
import animalsController from '../controllers/animalsController.js';
import checkTonken from '../authentication/token.js';

const router = express.Router();

router
  .get('/animals/search', animalsController.searchByState)
  .get('/animals', animalsController.getAllAnimals)
  .get('/animals/:id', checkTonken, animalsController.getAnimal)
  .post('/animals/register', animalsController.register)
  .delete('/animals/:id', checkTonken, animalsController.delete)
  .put('/animals/:id', checkTonken, animalsController.update)

export default router;
