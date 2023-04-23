export interface Animal {
    id: string,
    photoUrl: string,
    name: string,
    age: string,
    size: string,
    characteristics: string,
    city: string
};

export interface Animals {
  allAnimals: Animal[];
}

// export type Animals = Array<Animal>;
