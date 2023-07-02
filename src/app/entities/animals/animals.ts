export interface Animal {
    _id?: string,
    photoUrl: string,
    name: string,
    age: string,
    size?: string,
    characteristics: string,
    city: string,
    about?: string
};

export interface Animals {
  allAnimals: Animal[];
}
