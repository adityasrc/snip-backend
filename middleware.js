import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token Missing or Invalid Format" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // We know exactly what our token contains from auth.js
        req.userId = decoded.id; 
        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized or Expired token" });
    }
}