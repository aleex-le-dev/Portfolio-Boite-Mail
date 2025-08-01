import React, { useState } from 'react';
import './ProjetTemplate.css';
import { PROJECT_CATEGORY_COLORS } from '../constantes';

const ProjetTemplate = ({ projet, onClose, embedded = false, darkMode = false }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!projet) return null;

  const getCategoryColor = (category) => {
    return PROJECT_CATEGORY_COLORS[category] || PROJECT_CATEGORY_COLORS.default;
  };

  const getTransparentColor = (color) => {
    // Convertir hex en rgb pour rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, 0.25)`;
  };

  return (
    <div className={`${embedded ? "projet-template-embedded" : "projet-template-overlay"} ${darkMode ? 'dark-mode' : ''}`} onClick={embedded ? undefined : onClose}>
      <div className={`projet-template-container ${darkMode ? 'dark-mode' : ''}`} onClick={(e) => !embedded && e.stopPropagation()}>
        {/* Header Section */}
        <div 
          className="projet-header" 
          style={{ 
            backgroundImage: projet.image ? `url(${projet.image})` : undefined,
            backgroundColor: projet.image ? 'transparent' : getCategoryColor(projet.category)
          }}
        >
          <div className="projet-header-content">
            <div className="projet-meta" style={{ backgroundColor: getTransparentColor(getCategoryColor(projet.category)) }}>
              {/* Debug: {getCategoryColor(projet.category)} - {getTransparentColor(getCategoryColor(projet.category))} */}
              <h1 className="projet-title">{projet.title}</h1>
              <p className="projet-date">{projet.date}</p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="projet-section">
          <div className="section-content">
            <h2 className="section-title">À propos du projet</h2>
            <p className="projet-description">{projet.content[0]}</p>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="projet-section technologies-section">
          <div className="section-content">
            <h2 className="section-title">Technologies utilisées</h2>
            <div className="technologies-grid">
              {projet.content.find(line => line.includes('Technologies utilisées :')) && 
                projet.content
                  .slice(projet.content.findIndex(line => line.includes('Technologies utilisées :')) + 1)
                  .find(line => line.includes('•'))
                  ?.split('•')
                  .filter(tech => tech.trim())
                  .map((tech, index) => (
                    <div key={index} className="tech-item">
                      <span className="tech-bullet">•</span>
                      <span className="tech-name">{tech.trim()}</span>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="projet-section features-section">
          <div className="section-content">
            <h2 className="section-title">Fonctionnalités principales</h2>
            <div className="features-list">
              {projet.content
                .slice(
                  projet.content.findIndex(line => line.includes('Fonctionnalités principales :')) + 1,
                  projet.content.findIndex(line => line.includes('Projet')) !== -1 
                    ? projet.content.findIndex(line => line.includes('Projet'))
                    : projet.content.length
                )
                .filter(line => line.includes('•'))
                .map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-bullet">•</span>
                    <span className="feature-text">{feature.replace('•', '').trim()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        {projet.screenshots && projet.screenshots.length > 0 && (
          <div className="projet-section screenshots-section">
            <div className="section-content">
              <h2 className="section-title">Captures d'écran</h2>
              <div className="screenshots-grid">
                {projet.screenshots.map((screenshot, index) => (
                  <div key={index} className="screenshot-item">
                                         <img 
                       src={screenshot} 
                       alt={`Capture d'écran ${index + 1}`} 
                       className="screenshot-image"
                       onClick={() => {
                         setPreviewImage(screenshot);
                         setCurrentImageIndex(index);
                       }}
                     />
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

                 {/* Screenshot Preview Modal */}
         {previewImage && (
           <div className="screenshot-preview-overlay" onClick={() => setPreviewImage(null)}>
             <div className="screenshot-preview-container" onClick={(e) => e.stopPropagation()}>
               <img 
                 src={projet.screenshots[currentImageIndex]} 
                 alt="Preview" 
                 className="screenshot-preview-image"
               />
               
               {/* Flèche précédente */}
               {currentImageIndex > 0 && (
                 <button 
                   className="screenshot-nav-btn screenshot-prev-btn" 
                   onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                   aria-label="Image précédente"
                 >
                   ‹
                 </button>
               )}
               
               {/* Flèche suivante */}
               {currentImageIndex < projet.screenshots.length - 1 && (
                 <button 
                   className="screenshot-nav-btn screenshot-next-btn" 
                   onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                   aria-label="Image suivante"
                 >
                   ›
                 </button>
               )}
               
               <button 
                 className="screenshot-preview-close" 
                 onClick={() => setPreviewImage(null)}
                 aria-label="Fermer l'aperçu"
               >
                 ×
               </button>
             </div>
           </div>
         )}

        {/* Links Section */}
        {projet.content.filter(line => line.includes('https://')).length > 0 && (
          <div className="projet-section links-section">
            <div className="section-content">
              {(() => {
                const links = projet.content
                  .filter(line => line.includes('https://'))
                  .filter(line => {
                    const isCodeLink = line.includes('Voir le code : ');
                    if (isCodeLink) {
                      const urlPart = line.split('Voir le code : ')[1];
                      return urlPart && urlPart.trim() !== '';
                    }
                    return true;
                  })
                  .filter((_, index, array) => {
                    const currentLink = array[index];
                    const currentIsDemo = currentLink.includes('site');
                    const firstOfSameType = array.findIndex(link => {
                      const linkIsDemo = link.includes('site');
                      return linkIsDemo === currentIsDemo && link === currentLink;
                    });
                    return firstOfSameType === index;
                  });
                
                return (
                  <>
                    <h2 className="section-title">
                      {links.length > 1 ? 'Liens utiles' : 'Lien utile'}
                    </h2>
                    <div className="project-links">
                      {links.map((link, index) => {
                        const isDemo = link.includes('site');
                        return (
                          <a 
                            key={index} 
                            href={`https://${link.split('https://')[1]}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`project-link ${isDemo ? 'demo-link' : 'code-link'}`}
                          >
                            <span className="link-icon">
                              {isDemo ? '🚀' : '💻'}
                            </span>
                            <span className="link-text">
                              {isDemo ? 'Voir le site' : 'GitHub'}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Close Button */}
        <button className="projet-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProjetTemplate; 