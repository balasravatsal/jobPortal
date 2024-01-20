import axios from 'axios'

const customFetch = axios.create({
    baseURL: process.env.NODE_ENV === "production"
    ? "api/v1/"
    :'http://localhost:5000/api/v1/'
})

export default customFetch
