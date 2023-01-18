const db = require("../models");
const leaveType = db.leaveType;
exports.getLeaveType = (req, res) => {
    leaveType.find()
    .exec((err, leaveTypes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(leaveTypes);
    });
};
exports.postLeaveType = (req, res) => {
    const leaveTypeRes = new leaveType({
        name: req.body.name
    });
    leaveTypeRes.save((err, leave) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Leave was added successfully!" });
    })
};