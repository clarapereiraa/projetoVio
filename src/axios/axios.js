import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("token");
        console.log(token);
        if(token){
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const sheets = {
    getUsers:()=>api.get("user"),
    getEventos:() =>api.get("evento"),
    postLogin:(user) => api.post("login/", user),
    deleteUser:(id) => api.delete("user/"+id),
    deleteEvento:(id_evento) => api.delete("evento/"+id_evento),
    createIngresso: (ingresso) => api.post("/ingresso", ingresso),
}

export default sheets;