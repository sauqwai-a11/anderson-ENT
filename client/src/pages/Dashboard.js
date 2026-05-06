import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [subjects, setSubjects] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectsRes, progressRes] = await Promise.all([
        axios.get('/api/subjects'),
        axios.get(`/api/progress/user/${user?.id}`)
      ]);
      setSubjects(subjectsRes.data);
      setProgress(progressRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const subjectData = [
    { name: 'Химия', icon: '⚗️', color: '#ff6b6b' },
    { name: 'Биология', icon: '🔬', color: '#4ecdc4' },
    { name: 'Анатомия', icon: '🦴', color: '#95e1d3' }
  ];

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>🎓 Anderson ENT</h1>
          <div className="navbar-links">
            <Link to="/profile">👤 Профиль</Link>
            <button className="btn-logout" onClick={handleLogout}>Выход</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="welcome">
          <h2>Добро пожаловать, {user?.name}! 👋</h2>
          <p>Начните учиться и подготовьтесь к ЕНТ</p>
        </div>

        {progress && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>📊 Прогресс</h3>
              <p className="stat-value">{progress.estimatedENTScore || 0}/140</p>
              <p className="stat-label">Примерный балл ЕНТ</p>
            </div>
            <div className="stat-card">
              <h3>✅ Тесты</h3>
              <p className="stat-value">{progress.testsCompleted}</p>
              <p className="stat-label">Пройдено тестов</p>
            </div>
            <div className="stat-card">
              <h3>📈 Очки</h3>
              <p className="stat-value">{progress.totalScore}</p>
              <p className="stat-label">Всего очков</p>
            </div>
          </div>
        )}

        <div className="subjects-section">
          <h2>Выберите предмет 📚</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Загрузка...</p>
            </div>
          ) : (
            <div className="subjects-grid">
              {subjectData.map((subject, idx) => (
                <Link key={idx} to={`/subject/${idx}`} className="subject-card" style={{ borderTop: `4px solid ${subject.color}` }}>
                  <div className="subject-icon">{subject.icon}</div>
                  <h3>{subject.name}</h3>
                  <p>Изучайте теорию и проходите тесты</p>
                  <button className="btn-start">Начать →</button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
