const jwt = require("jsonwebtoken");

// CHECK TOKEN
module.exports = (req, res, next) => {
    try {
        const token = req.header("x-access-token");
        if (!token) return res.status(403).send("Accès refusé.");

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Le token est invalide");
    }
    
};