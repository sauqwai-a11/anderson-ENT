const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Химия', 'Биология', 'Анатомия']
  },
  description: String,
  topics: [{
    id: String,
    name: String,
    description: String,
    videoUrl: String,
    content: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
