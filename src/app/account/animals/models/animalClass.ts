import { Animal } from './../animals';
export class AnimalClass implements Animal {

  constructor(
    readonly id: string,
    readonly photoUrl: string,
    readonly name: string,
    readonly age: string,
    readonly size: string,
    readonly characteristics: string,
    readonly city: string
  ) {
    this.id = id;
    this.photoUrl = photoUrl;
    this.name = name;
    this.age = age;
    this.size = size;
    this.characteristics = characteristics;
    this.city = city;
  }

  get getId(): string { return this.id };
  get getPhotoUrl(): string { return this.photoUrl };
  get getName(): string { return this.name };
  get getAge(): string { return this.age };
  get getSize(): string { return this.size };
  get getCharacteristics(): string { return this.characteristics };
  get getCity(): string { return this.city };
}
