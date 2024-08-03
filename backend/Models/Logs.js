const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  programme: { type: String, required: true },
  sem: { type: Number, required: true }, 
  subject: { type: String, required: true },
  faculty_Name: { type: String, required: true },
  total_no_of_absenties: { type: Number, required: true }, 
  students: [{ type: String }],
}, {
  timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
