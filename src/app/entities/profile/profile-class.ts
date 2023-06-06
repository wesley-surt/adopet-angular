export class ProfileClass {

  constructor(
    readonly _id: string,
    readonly photo: string,
    readonly name: string,
    readonly city: string,
    readonly about: string,
    readonly telephone: string
  ) {
    this._id = _id;
    this.photo = photo;
    this.name = name;
    this.city = city;
    this.about = about;
    this.telephone = telephone;
  }

  get getLength(): number {
    return 6;
  }

  get getId(): string {
    return this._id;
  }

  get getPhoto(): string {
    return this.photo;
  }

  get getName(): string {
    return this.name;
  }

  get getCity(): string {
    return this.city;
  }

  get getAbout(): string {
    return this.about;
  }

  get getTelephone(): string {
    return this.telephone;
  }
}
