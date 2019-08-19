import axios from 'axios'

class ChatService {
    constructor (){
        this.back = axios.create({
            baseURL: 'http://192.168.66.70:4000/api'
        })
    }
    
    getAllAps(){
        return this.chat.get('/getChat/:id')
        .then(response => response)
    }
    
    updateOneM(id, data){
        console.log(id)
        return this.chat.put(`/postMessage/${id}`, data)
        .then(response => response)
    }
}
    
const chat  = new ChatService();

export default chat;