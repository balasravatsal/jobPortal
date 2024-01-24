import axios from 'axios';

const customFetch = axios.create({
    baseURL: 
        // process.env.NODE_ENV === "production" ?
        "http://13.233.233.194:5001/api/v1/"
})

export default customFetch;
