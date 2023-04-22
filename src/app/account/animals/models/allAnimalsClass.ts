import { Animal, Animals } from "../animals";

export class AllAnimalsClass {

  allAnimal: Animals;

  constructor(readonly allAnimals: Animals) {
    this.allAnimal = allAnimals;
  }

  get getAllAnimals(): Animal[] {
    return this.allAnimals.concat([]);
  };
}
