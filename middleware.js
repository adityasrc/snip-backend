import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function middleware(req, res, next){
    const authHeader = req.headers.authorization ?? ""; //gives empty string if it is undefined(saftey ke liye)

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if(!token){
        return res.status(401).json({
            message: "Token Missing or Invalid Format"
        })
    }
    try{
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(403).json({
                message: "Invalid Token"
            });
        }
    }catch(e){
        return res.status(403).json({
            message: "Unauthorized or Invalid token"
        })
    }   
}