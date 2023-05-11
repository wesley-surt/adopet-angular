export interface Profile {
  _id?: string,
  photo?: string,
  name: string,
  city: string,
  telephone: string
  about?: string,
};

export interface ProfileToSend {
  email: string,
  profile: Profile
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
