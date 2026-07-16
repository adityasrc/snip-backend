import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization ?? "";

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.status(401).json({
            message: "Token Missing or Invalid Format"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }
    } catch (e) {
        return res.status(401).json({
            message: "Unauthorized or Invalid token"
        });
    }
}