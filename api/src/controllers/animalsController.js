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
        .populate('advertiser');

      if(animal) {
        return res.status(200).json( animal );
      }
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: 'No animal found' + err });
    };
  }
}

export default AnimalsController;
