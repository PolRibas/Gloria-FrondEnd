import axios from 'axios';

class ProfileServices {
  constructor() {
    this.profileService = axios.create({
      baseURL: process.env.BACKEND_DOMAIN,
      withCredentials: true
    })
  }

  updateprofile(data) {
    const { _id, username, email, firstName, surname} = data;
    return this.profileService.put('/profile/updateProfile', {_id, username, email, firstName, surname})
      .then(({ data }) => data);
  }

}

const profileService = new ProfileServices();

export default profileService