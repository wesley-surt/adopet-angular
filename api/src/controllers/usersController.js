import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/Users.js';
import { environment } from '../../environment/env.js';
import { validateField } from '../utils/validate-field.js'

const secret = environment.SECRET_KEY ;

class UsersController {

  static confirmsUser = async (req, res) => {
    const { email, password } = req.body;

    validateField(email, `Email is required - ${email}`, res);
    validateField(password, `Password is required - ${password}`, res);

    const user = await users.findOne({ email: email });
    validateField(user, 'User not find.', res);

    const checkPassword = await bcrypt.compare(password, user.password);
    validateField(checkPassword, 'Invalid password.', res);

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
      res.status(500).json({ message: 'Server error. Try again later' });
    };
  };

  static register =  async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    validateField(email, `Email is required - ${email}`, res);
    validateField(name, `ERROR: Name is required - ${name}`, res);
    validateField(password, `ERROR: Password is required - ${password}`, res);
    validateField(confirmPassword, `ERROR: Confirm Password is required - ${confirmPassword}`, res);

    const userExists = await users.findOne({ email: email });
    if(userExists) {
      return res.status(422).json({
        error: `ERROR: This email alredy exists.Please, use another - ${userExists}`
      })
    };

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new users({
      email,
      name,
      password: passwordHash,
    });

    try {
      const userSaved = await user.save();
      if(!userSaved) throw new Error;

      return res.status(200).json({ email: email });

    } catch (err) {
      return res.status(500).json({ error: err });
    };
  }

  static userQuery = async (req, res) => {
    const id = req.params.id;
    const user = await users.findById(id, '-password');

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
    } else {
      res.status(200).json({ user });
    };
  };

  static exists = async (req, res) => {

    const {email} = req.body;
    validateField(email, 'Email is required', res);

    const user = await users.findOne({ email: email });

    if(user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({});
    };
  };
};

export default UsersController;
