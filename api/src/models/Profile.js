import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    id: { type: String },
    photo: { type: String },
    name: { type: String, required: true },
    city: { type: String },
    about: { type: String },
    telephone: { type: String }
  }
);

const profiles = mongoose.model('profiles', profileSchema);

export default profiles;
