export interface Profile {
  _id: string,
  photo: string,
  name: string,
  city: string,
  about: string,
  telephone: string
};

export interface Envio {
  email: string,
  profile:
    {
      id: string,
      photo: string,
      name: string,
      city: string,
      about: string,
      telephone: string
    }
}

/** {
  "email": "toddols@gmail.com",
  "profile":
    {
      "id": "",
      "photo": "asf465F4S44fs.png",
      "name": "Toddols",
      "city": "Reino Cogumelo",
      "about": "Sou um cogumelo fofinho",
      "telephone": "319xxxxyyyy"
    }
} */
