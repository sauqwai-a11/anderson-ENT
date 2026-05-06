import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile({ user, onLogout }) {
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(`/api/progress/user/${user?.id}`);
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <nav className="navbar">
        <button onClick={() => navigate('/dashboard')} className="btn-back">← Назад</button>
        <h1>👤 Профиль</h1>
      </nav>

      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">👤</div>
            <div className="user-info">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
          </div>

          {progress && (
            <div className="stats-section">
              <h3>📊 Ваш прогресс</h3>
              <div className="stats-grid">
                <div className="stat">
                  <h4>Примерный балл ЕНТ</h4>
                  <p className="stat-value">{progress.estimatedENTScore}/140</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(progress.estimatedENTScore / 140) * 100}%` }}></div>
                  </div>
                </div>
                <div className="stat">
                  <h4>Пройдено тестов</h4>
                  <p className="stat-value">{progress.testsCompleted}</p>
                </div>
                <div className="stat">
                  <h4>Общее количество очков</h4>
                  <p className="stat-value">{progress.totalScore}</p>
                </div>
              </div>
            </div>
          )}

          <div className="tips-section">
            <h3>💡 Советы для успешной подготовки</h3>
            <ul className="tips-list">
              <li>🎯 Занимайтесь ежедневно минимум 2-3 часа</li>
              <li>📚 Чередуйте теорию с практикой (тестами)</li>
              <li>✅ Повторяйте пройденный материал каждую неделю</li>
              <li>📝 Делайте конспекты и выписывайте важные формулы</li>
              <li>🚀 К концу подготовки вы должны набрать 120+ баллов</li>
            </ul>
          </div>

          <button className="btn-logout" onClick={handleLogout}>🚪 Выход</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
