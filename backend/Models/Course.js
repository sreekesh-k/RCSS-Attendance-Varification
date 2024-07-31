const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  teacher: [{ type: String, required: true }],
  graduation: {
    type: String,
    enum: ['UG', 'PG'],
    required: true,
  },
  // Add a semester field if needed for further processing
  semester: { type: Number, min: 1, max: 6 }, // For example, 1 to 6 for UG, 1 to 4 for PG
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
