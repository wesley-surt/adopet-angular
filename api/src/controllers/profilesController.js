import profiles from "../models/Profile.js";

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
}

export default ProfilesController;
