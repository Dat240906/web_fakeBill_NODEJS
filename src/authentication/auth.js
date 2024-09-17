import jwt from 'jsonwebtoken';
import { statusCode } from '../utils/index.js';

function isTokenExpired(expirationTime) {
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại dưới dạng Unix timestamp
    return currentTime > expirationTime;
}

export default function checkToken(req, res, next) {
    const url = req.url;
    const urlsPublic = ['/user/login', '/user/register', '/auth']
    if (urlsPublic.includes(url) || url.startsWith('/resources')) {
        return next();
    }

    try {
        debugger
        const token = req.cookies.token
        console.log(token)
        if (!token) {
            return res.redirect('auth');
        }

        const jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
        if (isTokenExpired(jwtVerify.exp)) {
            return res.redirect('auth');
        }

        next();
    } catch (error) {
        return res.redirect('auth');
    }
}
