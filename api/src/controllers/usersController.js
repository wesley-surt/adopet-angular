import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/Users.js';
import { environment } from '../../environment/env.js';
import { httpResponse } from '../utils/http-response.js';
import { validateField } from '../utils/validate-field.js'

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
      const profileId = user.profileId;
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

  static register =  async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    validateField(email, `Email is required - ${email}`, res);
    validateField(name, `ERROR: Name is required - ${name}`, res);
    validateField(password, `ERROR: Password is required - ${password}`, res);
    validateField(confirmPassword, `ERROR: Confirm Password is required - ${confirmPassword}`, res);

    // if(!email) {
    //   return res.status(422).send({ message: `Email is required - ${email}` });
    // };
    // if(!name) {
    //   return res.status(422).send({ message: 'Name is required'});
    // };
    // if(!password) {
    //   return res.status(422).send({ message: 'Password is required'});
    // };
    // if(confirmPassword !== password) {
    //   return res.status(422).send({ message: 'Passwords do not match' });
    // };

    const userExists = await users.findOne({ email: email });
    validateField(userExists, `ERROR: Please, use another email - ${userExists}`, res);

    // if(userExists) {
    //   return res.status(404).send({ message: 'Please, use another email' });
    // };

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new users({
      email,
      name,
      password: passwordHash,
    });

    try {
      await user.save();
      httpResponse(200, 'User saved successfully!', res, email);
      // res.status(200).json({ message: 'User saved successfully!'});

    } catch(err) {
      // httpResponse(500, `Error. Try again later!`, res, err);
      // res.status(500).json({ message: 'Error. Try again later!', error: err.message });
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

  static exists = async (req, res) => {

    const {email} = req.body;
    if(!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await users.findOne({ email: email });

    if(user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({});
    };
  };
};

export default UsersController;
