const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.register = async (req, res) => {
    const {name, phone} = req.body;
    if(!name || !phone) {return res.json({message: "Name and phone fields are missing"})};
    try {
        let patientExists = await Patient.findOne({phone: phone});
        if(patientExists) {
            return res.json({message: "Patient with this phone number already registered"});
        }
        let patient = await Patient.create({
            name: name,
            phone: phone,
            doctor: req.user._id
        })
        if(patient) {
            return res.json({
                _id: patient.id,
                name: patient.name,
                phone: patient.phone
            })
        } 
    } catch(err) {
        return res.json({message: err});
    }
};

module.exports.createReport = async (req, res) => {
    const {status} = req.body;
    if(!status) {return res.json({message: "please enter status"});}
    let patient = await Patient.findById(req.params.id);
    if(patient) {
        let report = await Report.create({
            created_by: patient.doctor,
            status: status,
            date: Date()
        });
        patient.reports.push(report);
        patient.save();
        
        return res.json({
            report
        });
    }
};

module.exports.allReports = async (req, res) => {
    let patient = await Patient.findById(req.params.id);
    if(patient) {
        let patientReports = await patient.populate("reports");
        return res.json(patientReports.reports);
    }
};