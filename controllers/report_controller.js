const Report = require('../models/report');

module.exports.reportsByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const result = await Report.find({status: status});
        if(result.length > 0) {
            return res.json(result);
        } else {
            return res.json({message: "No reports with matching status"});
        }
    } catch(err) {
        return res.json(err);
    }
}