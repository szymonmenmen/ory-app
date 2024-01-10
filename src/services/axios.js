import axios from 'axios'


const api = axios.create({
  baseURL: "https://strange-mayer-6ttl9at1pm.projects.oryapis.com",
})



export { api }
