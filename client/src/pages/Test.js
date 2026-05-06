import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Test.css';

function Test({ user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      text: 'Что такое атом?',
      options: ['Молекула вещества', 'Наименьшая частица вещества', 'Ион', 'Электрон'],
      correctAnswer: 1,
      explanation: 'Атом - это наименьшая неделимая частица вещества, которая является основой химического элемента.'
    },
    {
      id: 2,
      text: 'Из скольких электронов состоит атом углерода?',
      options: ['4', '6', '8', '12'],
      correctAnswer: 1,
      explanation: 'Углерод имеет порядковый номер 6 в периодической таблице, значит у него 6 электронов.'
    },
    {
      id: 3,
      text: 'Какова химическая формула воды?',
      options: ['H2O', 'CO2', 'O2', 'H2'],
      correctAnswer: 0,
      explanation: 'Вода состоит из двух атомов водорода и одного атома кислорода, поэтому её формула H2O.'
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setTestComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTestComplete(false);
  };

  if (testComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const estimatedScore = Math.round((percentage / 100) * 140);

    return (
      <div className="test-page">
        <div className="result-card">
          <h1>🎉 Тест завершен!</h1>
          <div className="result-score">
            <p>Вы ответили правильно на {score} из {questions.length} вопросов</p>
            <h2>{percentage}%</h2>
            <p className="estimated-score">Примерный балл ЕНТ: <strong>{estimatedScore}/140</strong></p>
          </div>
          <div className="result-buttons">
            <button className="btn-primary" onClick={handleRestart}>Пересдать тест</button>
            <button className="btn-secondary" onClick={() => navigate('/dashboard')}>На главную</button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="test-page">
      <div className="test-container">
        <div className="test-header">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
          <p className="progress-text">Вопрос {currentQuestion + 1} из {questions.length}</p>
        </div>

        <div className="question-card">
          <h2>{question.text}</h2>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
              >
                <span className="option-letter">{{0: 'A', 1: 'B', 2: 'C', 3: 'D'}[index]}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="explanation">
              <p><strong>Объяснение:</strong> {question.explanation}</p>
            </div>
          )}

          {isAnswered && (
            <button className="btn-next" onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Test;
