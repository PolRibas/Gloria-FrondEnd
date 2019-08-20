import axios from 'axios';

class clubServiceClass {
  constructor() {
    this.clubService = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
      withCredentials: true
    })
  }

  getUserForPush() {
    return this.clubService.get(`/profile/getAllUsers`)
      .then(users => users);
  }

  createNewClub(admins, name, city, sport) {
    return this.clubService.post(`/club/createClub`,{admins, name, city, sport})
    .then(club => club);
  }

  doIHaveClub(id) {
        return this.clubService.get(`/club/admin/${id}`)
        .then(club => club);
  }

  createTeam(name, treiners, clubId){
    return this.clubService.put(`/club/createTeam`, {name, treiners, clubId})
    .then(club => club);
  }

  getMyTeam(id) {
    return this.clubService.get(`/club/myteam/${id}`)
      .then(users => users);
  }

  addPlayerToTeam(idPlayer, idTeam){
    return this.clubService.put(`/club/addPlayerToTeam`, {idPlayer, idTeam})
  }

  iAmPartOfTheClub(id){
    return this.clubService.get(`/club/iAmInAClubInterfice/${id}`)
  }
  createAnewEvent(teamId, type, date, title, rival){
    return this.clubService.put(`/club/createEvent`, {teamId, type, date, title, rival})
  }
  loadEvents(teamId, type, date){
    return this.clubService.get(`/club/loadEvents`, {teamId, type, date})
  }
  findEventById(id){
    return this.clubService.get(`/club/getEvent/${id}`)
  }

  deleteEventById(id){
    return this.clubService.delete(`/club/deleteEvent/${id}`)
  }

  updateEvent(data){
    return this.clubService.put(`/club/updateEvent`, data)
  }

}

const clubService = new clubServiceClass();

export default clubService