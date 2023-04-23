import mongoose from 'mongoose';

const animalsSchema = mongoose.Schema(
  {
    id: { type: String },
    photoUrl: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: String },
    size: { type: String },
    characteristics: { type: String },
    city: { type: String, required: true }
  }
)

const animals = mongoose.model('animals', animalsSchema);

export default animals;
