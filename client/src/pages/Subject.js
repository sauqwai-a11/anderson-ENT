import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Subject.css';

function Subject({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const subjectData = [
    {
      name: 'Химия',
      icon: '⚗️',
      topics: [
        { id: 1, name: 'Основы химии', videoUrl: 'dQw4w9WgXcQ', content: 'Химия - наука о веществах и их взаимодействиях. Вещество состоит из атомов и молекул...' },
        { id: 2, name: 'Органическая химия', videoUrl: 'dQw4w9WgXcQ', content: 'Органические вещества содержат углерод. Они образуют основу живых организмов...' },
        { id: 3, name: 'Неорганическая химия', videoUrl: 'dQw4w9WgXcQ', content: 'Неорганические вещества - это все остальные вещества, не содержащие углерод...' }
      ]
    },
    {
      name: 'Биология',
      icon: '🔬',
      topics: [
        { id: 1, name: 'Клетка', videoUrl: 'dQw4w9WgXcQ', content: 'Клетка - основная единица жизни. Все живые организмы состоят из одной или многих клеток...' },
        { id: 2, name: 'Генетика', videoUrl: 'dQw4w9WgXcQ', content: 'Генетика - наука о наследственности. ДНК содержит информацию о признаках организма...' },
        { id: 3, name: 'Эволюция', videoUrl: 'dQw4w9WgXcQ', content: 'Эволюция - процесс медленного изменения организмов. Естественный отбор - главный механизм эволюции...' }
      ]
    },
    {
      name: 'Анатомия',
      icon: '🦴',
      topics: [
        { id: 1, name: 'Костная система', videoUrl: 'dQw4w9WgXcQ', content: 'Костная система состоит из костей и суставов. Она обеспечивает опору и защиту органов...' },
        { id: 2, name: 'Мышечная система', videoUrl: 'dQw4w9WgXcQ', content: 'Мышцы позволяют организму двигаться. Существуют скелетные, гладкие и сердечные мышцы...' },
        { id: 3, name: 'Органы чувств', videoUrl: 'dQw4w9WgXcQ', content: 'Органы чувств помогают ощущать окружающий мир. К ним относятся глаза, уши, нос, язык...' }
      ]
    }
  ];

  const subject = subjectData[parseInt(id)];
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="subject-page">
      <nav className="navbar">
        <button onClick={() => navigate('/dashboard')} className="btn-back">← Назад</button>
        <h1>{subject.icon} {subject.name}</h1>
      </nav>

      <div className="subject-container">
        <div className="topics-list">
          <h2>Темы</h2>
          {subject.topics.map((topic) => (
            <button
              key={topic.id}
              className={`topic-btn ${selectedTopic?.id === topic.id ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic)}
            >
              📖 {topic.name}
            </button>
          ))}
        </div>

        <div className="topic-content">
          {selectedTopic ? (
            <>
              <h2>{selectedTopic.name}</h2>
              <div className="video-container">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${selectedTopic.videoUrl}`}
                  title={selectedTopic.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="content-text">
                <h3>Конспект</h3>
                <p>{selectedTopic.content}</p>
              </div>
              <button className="btn-test" onClick={() => navigate(`/test/${selectedTopic.id}`)}>
                Пройти тест →
              </button>
            </>
          ) : (
            <div className="placeholder">
              <p>Выберите тему слева для просмотра</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subject;
