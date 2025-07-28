import React from "react";
import { HiPaperClip } from "react-icons/hi";
import { MdAttachFile } from "react-icons/md";

const ProjetEmailItem = ({ projet, onClick }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Design': return '#2E8B57'; // Sea Green
      case 'Web': return '#4169E1'; // Royal Blue
      case 'Mobile': return '#FF6B35'; // Orange
      default: return '#2E8B57';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Design': return '🎨';
      case 'Web': return '🌐';
      case 'Mobile': return '📱';
      default: return '💼';
    }
  };

  return (
    <div
      className="projet-email-item cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Header avec image de fond */}
      <div 
        className="projet-email-header relative overflow-hidden rounded-t-lg"
        style={{ backgroundColor: getCategoryColor(projet.category) }}
      >
        {projet.image && (
          <div className="projet-email-image-container">
            <img 
              src={projet.image} 
              alt={projet.title} 
              className="projet-email-background-image"
            />
            <div className="projet-email-overlay"></div>
          </div>
        )}
        
        <div className="projet-email-header-content relative z-10">
          <div className="projet-email-category-badge">
            <span className="category-icon">{getCategoryIcon(projet.category)}</span>
            <span className="category-text">{projet.category}</span>
          </div>
          
          <h3 className="projet-email-title">{projet.title}</h3>
          
          <div className="projet-email-meta">
            <div className="projet-email-sender">
              <img src={projet.senderAvatar} alt={projet.sender} className="projet-email-avatar" />
              <div>
                <p className="projet-email-sender-name">{projet.sender}</p>
                <p className="projet-email-sender-email">{projet.email}</p>
              </div>
            </div>
            <span className="projet-email-date">{projet.date}</span>
          </div>
        </div>
      </div>

      {/* Contenu du projet */}
      <div className="projet-email-content">
        <div className="projet-email-description">
          {projet.content[0]}
        </div>
        
        {/* Technologies utilisées */}
        <div className="projet-email-technologies">
          <h4 className="projet-email-section-title">Technologies utilisées</h4>
          <div className="projet-email-tech-list">
            {projet.content.find(line => line.includes('Technologies utilisées :')) && 
              projet.content
                .slice(projet.content.findIndex(line => line.includes('Technologies utilisées :')) + 1)
                .find(line => line.includes('•'))
                ?.split('•')
                .filter(tech => tech.trim())
                .slice(0, 3) // Limiter à 3 technologies pour l'aperçu
                .map((tech, index) => (
                  <span key={index} className="projet-email-tech-tag">
                    {tech.trim()}
                  </span>
                ))}
          </div>
        </div>

        {/* Fonctionnalités principales */}
        <div className="projet-email-features">
          <h4 className="projet-email-section-title">Fonctionnalités principales</h4>
          <div className="projet-email-features-list">
            {projet.content
              .slice(
                projet.content.findIndex(line => line.includes('Fonctionnalités principales :')) + 1,
                projet.content.findIndex(line => line.includes('Projet')) !== -1 
                  ? projet.content.findIndex(line => line.includes('Projet'))
                  : projet.content.length
              )
              .filter(line => line.includes('•'))
              .slice(0, 2) // Limiter à 2 fonctionnalités pour l'aperçu
              .map((feature, index) => (
                <div key={index} className="projet-email-feature-item">
                  <span className="feature-bullet">•</span>
                  <span className="feature-text">{feature.replace('•', '').trim()}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Liens d'action */}
        <div className="projet-email-actions">
          {projet.content
            .filter(line => line.includes('https://'))
            .map((link, index) => {
              const isDemo = link.includes('démo');
              return (
                <a 
                  key={index} 
                  href={link.split('https://')[1]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`projet-email-action-btn ${isDemo ? 'demo-btn' : 'code-btn'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="action-icon">
                    {isDemo ? '🚀' : '💻'}
                  </span>
                  <span className="action-text">
                    {isDemo ? 'Voir la démo' : 'Code source'}
                  </span>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProjetEmailItem; 