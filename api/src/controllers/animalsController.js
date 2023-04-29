import animals from '../models/Animal.js';

export class AnimalsController {

  static getAllAnimals = async (req, res) => {
    try {
      const allAnimals = await animals.find();
      if (allAnimals)
        return res.status(200).json({ allAnimals });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' + err });
    }
  }

  static getAnimal = async (req, res) => {
    try {
      const {id} = req.params;
      const animal = await animals
        .findById(id)
        .populate('profileId');

      if(animal) {
        return res.status(200).json( animal );
      }
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: 'No animal found' + err });
    };
  }

  static register = async (req, res) => {
    const {photoUrl, name, age, size, characteristics, city, profileId} = req.body;

    if(!photoUrl) {
      return res.status(401).json({ message: 'PhotoUrl is required' });
    };
    if(!name) {
      return res.status(401).json({ message: 'Name is required' });
    };
    if(!city) {
      return res.status(401).json({ message: 'City is required' });
    };
    if(!profileId) {
      return res.status(401).json({ message: 'ProfileId is required' });
    };

    const animalToSave = new animals({
      photoUrl: photoUrl,
      name: name,
      age: age,
      size: size,
      characteristics: characteristics,
      city: city,
      profileId: profileId
    });

    try {
      animalToSave.save();

    } catch (err) {

      console.log(err);
      return res.status(500).json({ message: 'ERROR: Servidor failed'});
    };
  }
}

export default AnimalsController;
