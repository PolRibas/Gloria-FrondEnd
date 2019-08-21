import axios from 'axios';

class ProfileServices {
  constructor() {
    this.profileService = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true
    })
  }

  updateprofile(data) {
    const { _id, username, email, firstName, surname, url} = data;
    return this.profileService.put('/profile/updateProfile', {_id, username, email, firstName, surname, url})
      .then(({ data }) => data);
  }

}

const profileService = new ProfileServices();

export default profileService