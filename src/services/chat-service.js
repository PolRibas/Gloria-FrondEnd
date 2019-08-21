import axios from 'axios'

class ChatService {
    constructor (){
        this.chat = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/chat'
        })
    }
    
    getAllMessages(id){
        return this.chat.get(`/getChat/${id}`)
        .then(response => response)
    }
    
    updateOneM(data, id){
        console.log(id)
        return this.chat.put(`/postMessage/${id}`, data)
        .then(response => response)
    }
}
    
const chat  = new ChatService();

export default chat;