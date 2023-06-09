import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id: { type: String },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profileId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'profiles' }
  }
);

const users = mongoose.model('users', userSchema);

export default users;
