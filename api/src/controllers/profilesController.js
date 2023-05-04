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

      let userId = null;
      try {

        userId = await users.findOne({ email: email })
        .then((user) => {
          switch(user.profileId) {
            case null: {
              return user._id;
            };
            default: {
              return res.status(422).json({
                message: 'Error: Profile alrealy registered',
                profileId: 'Your id is: ' + user.profileId
              });
            }
          }
        })
        .catch((err) => {

          res.status(422).json({
            message: 'ERROR: Email does not exist in the database',
            error: err
          });
        });

      } catch(err) {
        console.log(err);
      }

      const profileToSave = new profiles({
        photo,
        name,
        city,
        about,
        telephone,
        userId
      });

      try {

        await profileToSave.save()
        .then()
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: 'ERROR: Servidor failed', error: err});
        });

        profiles.findOne({ userId: userId })
        .then((profile) => {

          users.findByIdAndUpdate({_id: userId}, { profileId: profile._id })
          .then(() => res.status(200).json(
            {
              message: 'Profile saved successfully and user updated successfully'
            })
          )
          .catch((err) => res.status(400).json(
            {
              message: 'ERROR: User not found to updatetion', error: err
            })
          );
        })
        .catch((err) =>
          res.status(400).json(
            {
              message: 'ERROR: Profile not found', error: err
            }
          )
        );

      } catch (err) {
        console.log(err);
      };

    } else {

      profiles.findByIdAndUpdate(id, {
        photo: photo,
        name: name,
        city: city,
        about: about,
        telephone: telephone,
        userId: userId
      })
      .then(() => res.status(200).json({ message: 'Profile updated successfully' }))
      .catch((err) => res.status(400).json(
        {
          message: 'ERROR: Failed. Profile not updated', error: err
        }
      ));
    };
  }
}

export default ProfilesController;
