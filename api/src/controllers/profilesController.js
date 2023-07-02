import { validateField } from '../utils/validate-field.js';
import profiles from "../models/Profile.js";
import users from "../models/Users.js";

class ProfilesController {

  static getProfile = async (req, res) => {
    let id = req.params.id;

    const profile = await profiles.findById(id);

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' })
    } else {
      res.status(200).json(profile);
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
    .then((profile) => res.status(200).json({ profile })
    .catch(err =>
      res.status(400).json({
        message: 'ERROR: Failed. Profile not updated',
        error: err.message
      })
    ));
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
          res.status(422).json({
            message: 'ERROR: User not found',
            error: err.message
          })
        });

      } catch(err) {
        res.status(500).json({
          message: 'ERROR: Server error',
          error: err.message
        })
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
          res.status(500).json({ message: 'ERROR: Servidor failed', error: err.message});
        });

        profiles
        .findOne({ userId: userId })
        .then(profile => {

          users.findByIdAndUpdate({ _id: userId }, { profileId: profile._id })
          .then(() => res.status(200).json({profile}))
          .catch(err =>
            res.status(400).json({
              message: 'ERROR: User not found to updatetion',
              error: err.message})
          )
        })
        .catch(err => res.status(400).json({
          message: 'ERROR: Profile created but not found',
          error: err.message})
        /** Implementar, posteriormente, nesta linha, dentro do catch, uma funcionalidade para excluir o
         * profile caso ele não seja encontrado para atualizar o campo profileId do usuario e o campo userId
         * do profile. Não quero que ambos existam sem um guardar o id do outro.
         */
        );

      } catch (err) {
        res.status(400).json({ error: err.message });
      };
  }
};

const checkProfileIdOfUser = (user, res) => {
  switch(user.profileId) {
    case null: {
      return user._id;
    };
    default: {
      return res.status(422).json({
        message: 'Error: Profile alrealy registered. Your id is: ' + user.profileId +
        '. Fill in the profileId field correctly before submitting the request to update.',
        error: err.message
      })
    }
  }
}

export default ProfilesController;
