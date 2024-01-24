import axios from 'axios';

const customFetch = axios.create({
    baseURL: 
        // process.env.NODE_ENV === "production" ?
        "https://job-seeker-backend.balasravatsal.tech/api/v1/"
})

export default customFetch;
