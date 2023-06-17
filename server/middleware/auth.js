import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization

    if(!authHeaders || !authHeaders.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeaders.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        req.user = { userId: payload.user_id }
        next()
    } catch (e) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

export default auth
