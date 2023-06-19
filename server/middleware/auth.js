import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization
    // console.log(authHeaders)
    if(!authHeaders || !authHeaders.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeaders.split(' ')[1]
    // console.log(token)
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        req.user = { userId: payload.user_id }
        next()
    } catch (e) {
        throw new UnauthenticatedError('Authentication Invalid 2')
    }
}

export default auth
