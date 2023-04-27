import profiles from '../models/Profile.js';
import users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from '../../environment/env.js';

const secret = environment.SECRET_KEY ;

class UsersController {

  static confirmsUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email) {
      return res.status(422).send({ message: 'Email is required'});
    };
    if(!password) {
      return res.status(422).send({ message: 'Password is required'});
    };

    const user = await users.findOne({ email: email });

    if(!user) {
      return res.status(404).send({ message: 'User not find.' });
    };

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
      return res.status(422).send({ message: 'Invalid password.' });
    };

    try {
      const profileId = user.profile;
      const token = jwt.sign(
        {
          id: user.id
        },
        secret,
      );
      res.status(200).json({ token, profileId });

    } catch(err) {
      console.log(err);
      res.status(500).json({ message: 'Server error. Try again later'});
    };
  };

  static registerUser =  async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    if(!email) {
      return res.status(422).send({ message: 'Email is required'});
    };
    if(!name) {
      return res.status(422).send({ message: 'Name is required'});
    };
    if(!password) {
      return res.status(422).send({ message: 'Password is required'});
    };
    if(confirmPassword !== password) {
      return res.status(422).send({ message: 'Passwords do not match' });
    };

    const userExists = await users.findOne({ email: email });

    if(userExists) {
      return res.status(404).send({ message: 'Please, use another email' });
    };

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new users({
      email,
      name,
      password: passwordHash,
    });

    try {
      user.save();
      res.status(200).send({ message: 'User saved successfully!'});

    } catch(err) {
      res.status(500).send({ message: 'Error. Try again later!'});
    };
  };

  static userQuery = async (req, res) => {
    const id = req.params.id;
    const user = await users.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(200).json({ user });
    };
  };

  static updateProfileField = async (userId, res) => {

    const profileDb = await profiles.findOne({ user: userId });
    if(profileDb) {

      users.findByIdAndUpdate(userId, { profile: profileDb.id });
      res.status(200).json({ message: 'Profile saved successful.' });

    } else {
      res.status(500).json({ message: 'ERROR: Servidor failed'});
    };
  }
};

export default UsersController;
