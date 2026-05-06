const express = require('express');
const Progress = require('../models/Progress');
const User = require('../models/User');
const router = express.Router();

// Get user progress
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const progress = await Progress.find({ userId: req.params.userId });
    
    const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
    const estimatedENT = Math.round((totalScore / (progress.length * 100)) * 140);
    
    res.json({
      user,
      progress,
      totalScore,
      testsCompleted: progress.length,
      estimatedENTScore: estimatedENT || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

module.exports = router;
