import axios from 'axios';

const customFetch = axios.create({
    baseURL: 
        // process.env.NODE_ENV === "production" ?
        "http://13.232.91.56/api/v1/"
        // "http://ec2-13-200-215-25.ap-south-1.compute.amazonaws.com/api/v1/"
        // : 'http://localhost:5000/api/v1/',
})

export default customFetch;
