const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

module.exports.auth = async(req, res, next) => {
    let token;
    if(req.headers['authorization'] && req.headers['authorization'].startsWith("Bearer")) {
        try {
            token = req.headers['authorization'].split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Doctor.findById(decoded.id).select("-password");
            next();
        } catch(err) {
            return res.json({message: "Not Authorized"});
        }
    } else {
        return res.json({message: "Not Authorized"});
    }
}