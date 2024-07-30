const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  
  name: { type: String, required: true },
  teacher: [{ type: String, required: true }],
  graduation: {
    type: String,
    enum: ['UG', 'PG'],
    required: true
  }
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
