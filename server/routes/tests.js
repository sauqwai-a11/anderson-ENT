const express = require('express');
const Test = require('../models/Test');
const Progress = require('../models/Progress');
const router = express.Router();

// Get tests by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const tests = await Test.find({ subjectId: req.params.subjectId });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
});

// Submit test answers
router.post('/submit', async (req, res) => {
  try {
    const { userId, testId, subjectName, answers } = req.body;
    const test = await Test.findById(testId);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    let correctCount = 0;
    test.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    
    const percentage = Math.round((correctCount / test.questions.length) * 100);
    const score = Math.round((correctCount / test.questions.length) * 100 / 10);
    
    const progress = new Progress({
      userId,
      testId,
      subjectName,
      score: correctCount,
      totalQuestions: test.questions.length,
      percentage
    });
    
    await progress.save();
    
    res.json({
      score: correctCount,
      totalQuestions: test.questions.length,
      percentage,
      estimatedENTScore: score
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting test' });
  }
});

module.exports = router;
