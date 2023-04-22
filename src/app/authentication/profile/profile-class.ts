export class ProfileClass {

  constructor(
    readonly id: string,
    readonly photo: string,
    readonly name: string,
    readonly city: string,
    readonly about: string,
    readonly telephone: string
  ) {
    this.id = id;
    this.photo = photo;
    this.name = name;
    this.city = city;
    this.about = about;
    this.telephone = telephone;
  }

  get getId() {
    return this.id;
  }
  
  get getPhoto() {
    return this.photo;
  }
  
  get getName() {
    return this.name;
  }
  
  get getCity() {
    return this.city;
  }
  
  get getAbout() {
    return this.about;
  }
  
  get getTelephone() {
    return this.telephone;
  }
}
