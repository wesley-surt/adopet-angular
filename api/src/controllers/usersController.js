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
      res.status(500).json({ message: 'Server error. Try again later' })
    };
  };

  static register =  async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    validateField(email, `Email is required - ${email}`, res);
    validateField(name, `ERROR: Name is required - ${name}`, res);
    validateField(password, `ERROR: Password is required - ${password}`, res);
    validateField(confirmPassword, `ERROR: Confirm Password is required - ${confirmPassword}`, res);

    const userExists = await users.findOne({ email: email })
    .then()
    .catch((err) => {

      console.log(err);
      res.status(400).json({
        message: `ERROR: Please, use another email - ${userExists}`,
        error: err.message
      });
    });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new users({
      email,
      name,
      password: passwordHash,
    });

    try {
      await user.save()
      then(() => {
        return res.status(200).json({ message: 'deu certo'});
      })
      .chatch((err) => {
        throw new Error(err);
      });

    } catch(err) {
      console.log(err);
      res.status(200).json({ error: err.message});
    };
  };

  static userQuery = async (req, res) => {
    const id = req.params.id;
    const user = await users.findById(id, '-password');

    if (!user) {
      console.log(user);
      res.status(404).json({ message: 'User not found.' })
    } else {
      res.status(200).json({ user })
    };
  };

  static exists = async (req, res) => {

    const {email} = req.body;
    validateField(email, 'Email is required', res);

    const user = await users.findOne({ email: email });

    if(user) {
      res.status(200).json({ exists: true })
    } else {
      res.status(404).json({})
    };
  };
};

export default UsersController;
