const mongoose = require("mongoose");

const LeaveType = mongoose.model(
  "LeaveType",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = LeaveType;