const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  dateFilledByUser: { type: Date, required: true },
  dateCreated: { type: Date, default: Date.now },
  courseName: { type: String, required: true },
  teacherName: { type: String, required: true },
  students: [{ type: String, required: true }],
}, {
  timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
