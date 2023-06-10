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

      httpResponse(200, '', { token, profileId });
      // res.status(200).json({ token, profileId });

    } catch(err) {
      console.log(err);
      httpResponse(500, 'Server error. Try again later', res);
    };
  };

  static register =  async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;

    validateField(email, `Email is required - ${email}`, res);
    validateField(name, `ERROR: Name is required - ${name}`, res);
    validateField(password, `ERROR: Password is required - ${password}`, res);
    validateField(confirmPassword, `ERROR: Confirm Password is required - ${confirmPassword}`, res);

    const userExists = await users.findOne({ email: email });
    validateField(userExists, `ERROR: Please, use another email - ${userExists}`, res);

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
    } catch(err) {
      httpResponse(500, `Error. Try again later!`, res, err);
    };
  };

  static userQuery = async (req, res) => {
    const id = req.params.id;
    const user = await users.findById(id, '-password');

    if (!user) {
      httpResponse(404, 'User not found.', res);
    } else {
      httpResponse(200, '', res, { user });
    };
  };

  static exists = async (req, res) => {

    const {email} = req.body;
    validateField(email, 'Email is required', res);

    const user = await users.findOne({ email: email });

    if(user) {
      httpResponse(200, '', res, { exists: true });
    } else {
      httpResponse(404, '', res, {});
    };
  };
};

export default UsersController;
