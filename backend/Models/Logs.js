const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  date: { type: Date, required: true },
  courseName: { type: String, required: true },
  teacherName: { type: String, required: true },
  students: [{ type: String, required: false }],
}, {
  timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
