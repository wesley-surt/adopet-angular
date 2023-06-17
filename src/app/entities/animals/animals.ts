export interface Animal {
    id: string,
    photoUrl: string,
    name: string,
    age: string,
    size: string,
    characteristics?: string,
    state: string,
    city: string,
    profileId: string
};

export interface Animals {
  allAnimals: Animal[];
}
