import animals from '../models/Animal.js';

export class AnimalsController {

  static getAnimals = (req, res) => {

    try {
      const allAnimals = animals.find();
      if (allAnimals)
        return res.status(200).json({ allAnimals });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' + err });
    }
  }
}

export default AnimalsController;
