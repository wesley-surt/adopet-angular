import UsersController from "./usersController.js";
import profiles from "../models/Profile.js";
import users from "../models/Users.js";

class ProfilesController {

  static getProfile = async (req, res) => {
    let id = req.params.id;

    const profile = await profiles.findById(id);

    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      } else {
        return res.status(200).json( profile );
      };
  }

  static register = async (req, res) => {
    const {email, profile} = req.body;
    const {id, photo, name, city, about, telephone, userId} = profile;
    if(!email) {
      return res.status(422).json({ message: 'ERROR: Email is required.' });
    };
    if(!name) {
      return res.status(422).json({ message: 'ERROR: Name is required.' });
    };
    if(!city) {
      return res.status(422).json({ message: 'ERROR: City is required.' });
    };
    if(!telephone) {
      return res.status(422).json({ message: 'ERROR: Telephone is required.' });
    };

    let firstAccess = null;
    id ? firstAccess = false : firstAccess = true;

    if(firstAccess) {

      const userDb = await users.findOne({ email: email });
      userId = userDb.id;

      const profileToSave = new profiles({
        photo,
        name,
        city,
        about,
        telephone,
        userId
      });

      try {
        profileToSave.save();

      } catch (err) {

        console.log(err);
        return res.status(500).json({ message: 'ERROR: Servidor failed'});
      };

      UsersController.updateProfileField(userDb.id, res);

    } else {

      const profileDb2 = await profiles.findByIdAndUpdate(id, {
        photo: photo,
        name: name,
        city: city,
        about: about,
        telephone: telephone
      });

      profileDb2
        ? res.status(400).json({ message: 'Profile updated successfully' })
        : res.status(400).json({ message: 'ERROR: Failed. Profile not updated' });
    }
  }
}

export default ProfilesController;
