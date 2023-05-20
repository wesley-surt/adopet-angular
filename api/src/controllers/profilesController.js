import { httpResponse } from '../utils/http-response.js';
import { validateField } from '../utils/validate-field.js';
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

  static update = async (req, res) => {
    const { id, photo, name, city, about, telephone } = req.body;

    validateField(name, 'ERROR: Name is required.', res);
    validateField(city, 'ERROR: city is required.', res);
    validateField(telephone, 'ERROR: Telephone is required.', res);

    profiles.findByIdAndUpdate(id, {
      photo: photo,
      name: name,
      city: city,
      about: about,
      telephone: telephone,
    })
    .then(() => httpResponse(200, 'Profile updated successfully', res))
    .catch(err => httpResponse(400, 'ERROR: Failed. Profile not updated', res, err));
  }

  static register = async (req, res) => {
    const { email, profile } = req.body;
    const { photo, name, city, about, telephone } = profile;

    validateField(name, 'ERROR: Name is required.', res);
    validateField(city, 'ERROR: city is required.', res);
    validateField(telephone, 'ERROR: Telephone is required.', res);

    let userId = null;

      try {

        userId = await users.findOne({ email: email })
        .then(user => checkProfileIdOfUser(user, res))
        .catch(err => {
          httpResponse(422, 'ERROR: User not found', res, err);
        });

      } catch(err) {
        console.log(err);
        httpResponse(500, 'ERROR: Server error', res, err);
      };

      const profileToSave = new profiles({
        photo, name, city, about, telephone, userId
      });

      try {

        await profileToSave
        .save()
        .then()
        .catch(err => {
          console.log(err);
          httpResponse(500, 'ERROR: Servidor failed', res, err);
        });

        profiles
        .findOne({ userId: userId })
        .then(profile => {

          users.findByIdAndUpdate({ _id: userId }, { profileId: profile._id })
          .then(() => httpResponse(
            200, 'Profile saved and user updated successfully', res
          ))
          .catch(err => httpResponse(
            400, 'ERROR: User not found to updatetion', res, err
          ))
        })
        .catch(err => httpResponse(
          400, 'ERROR: Profile created but not found', res, err
          )
        /** Implementar, posteriormente, nesta linha, dentro do catch, uma funcionalidade para excluir o
         * profile caso ele não seja encontrado para atualizar o campo profileId do usuario e o campo userId
         * do profile. Não quero que ambos existam sem um guardar o id do outro.
         */
        );

      } catch (err) {
        console.log(err);
      };
  }
};

const checkProfileIdOfUser = (user, res) => {
  switch(user.profileId) {
    case null: {
      return user._id;
    };
    default: {
      return httpResponse(
        422,
        'Error: Profile alrealy registered. Your id is: ' + user.profileId +
        '. Fill in the profileId field correctly before submitting the request to update.',
        res
      )
    }
  }
}

export default ProfilesController;
