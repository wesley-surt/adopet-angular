import { Animal, Animals } from "../animals";

export class AllAnimalsClass {

  constructor(readonly allAnimals: Animals) {
    this.allAnimals = allAnimals;
  }

  get getAllAnimals(): Animals {
    return this.allAnimals;
  };
}
