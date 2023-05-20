import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    id: { type: String },
    photo: { type: String },
    name: { type: String, required: true },
    city: { type: String, required: true },
    about: { type: String },
    telephone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null }
  }
);

const profiles = mongoose.model('profiles', profileSchema);

export default profiles;
