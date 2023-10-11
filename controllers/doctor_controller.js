const bcrypt = require('bcrypt');

const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET, {expiresIn : "30d"})
}

module.exports.register = async function(req, res) {
    if(!req.body || !req.body.username || !req.body.password) {
        return res.json({message: "Username|Password is missing"});
    }
    let doctor = await Doctor.findOne({username: req.body.username});
    if(doctor) {
        return res.json({message: "Doctor with this username already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    doctor = await Doctor.create({
        username: req.body.username,
        password: hash
    });

    if(doctor) {
        return res.status(200).json({
            _id: doctor.id,
            username: doctor.username
        });
    }
};

module.exports.login = async function (req, res) {
    if(!req.body || !req.body.username || !req.body.password) {
        return res.json({message: "Username|Password is missing"});
    }

    let doctor = await Doctor.findOne({username: req.body.username});
    if(!doctor) {
        return res.json({message: 'Doctor not found'});
    }
    let result = await bcrypt.compare(req.body.password, doctor.password);
    if(result) {
        return res.status(200).json({
            _id: doctor._id,
            username: doctor.username,
            token: generateToken(doctor._id)
        });
    } else {
        return res.json({
            message: "Invalid credentials"
        })
    }
};