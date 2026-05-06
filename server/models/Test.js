const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  title: String,
  questions: [{
    id: String,
    text: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', testSchema);
