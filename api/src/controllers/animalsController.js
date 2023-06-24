import animals from '../models/Animal.js';
import { httpResponse } from '../utils/http-response.js';
import { validateField } from '../utils/validate-field.js';

export class AnimalsController {

  static getAllAnimals = async (req, res) => {
    try {
      const allAnimals = await animals.find();
      if (allAnimals)
        res.status(200).json({ allAnimals });

    } catch (err) {
      console.log(err);
      httpResponse(500, 'Server error', res, err);
    }
  }

  static getAnimal = async (req, res) => {
    try {
      const {id} = req.params;
      const animal = await animals
        .findById(id)
        .populate('profileId');

      if(animal) {
        res.status(200).json({ animal });
      }

    } catch (err) {
        console.log(err);
        httpResponse(404, 'No animal found', res, err);
    };
  }

  static searchByState = async (req, res) => {

    const {state} = req.query;

    animals.find({'state': state}, {})
    .then((animals) => res.status(200).json(animals))
    .catch(err => res.status(500).json({message: err}));
  }

  static register = async (req, res) => {
    const {photoUrl, name, age, size, characteristics, city, state, profileId} = req.body;

    validateField(profileId, 'ProfileId is required', res);
    validateField(photoUrl, 'PhotoUrl is required', res);
    validateField(state, 'State is required', res);
    validateField(name, 'Name is required', res);
    validateField(city, 'City is required', res);

    const animalToSave = new animals({
      characteristics: characteristics,
      profileId: profileId,
      photoUrl: photoUrl,
      state: state,
      name: name,
      size: size,
      city: city,
      age: age,
    });

    try {
      animalToSave.save();
    } catch (err) {
      console.log(err);
      httpResponse(500, 'ERROR: Servidor failed', res, err);
    };
  }

  static delete = (req, res) => {
    const {id} = req.params;

    animals.findByIdAndDelete(id)
    .then(() => httpResponse(200, 'OK. Animal deleted', res))
    .catch(() => httpResponse(500, 'Internal Server Error', res));
  }

  static update = (req, res) => {
    const {id} = req.params;
    const {animal} = req.body;

    animals.findByIdAndUpdate(id, animal)
    .then(() => httpResponse(200, 'OK. Animal updated', res))
    .catch(() => httpResponse(500, 'Internal Server Error', res));
  }
}

export default AnimalsController;
