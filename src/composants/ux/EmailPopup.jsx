import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiUser, FiClock } from 'react-icons/fi';

const EmailPopup = ({ isVisible, onClose, darkMode, emailData: propEmailData, index = 0, onViewEmail, isExpanded, onToggleExpanded, totalPopups = 1, isLastPopup = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  // Utiliser les données passées en props ou des données par défaut
  const emailData = propEmailData || {
    sender: "Recrutement Google",
    email: "jobs@google.com",
    title: "Opportunité - Développeur Frontend Senior",
    content: [
      "Bonjour Alexandre,",
      "Nous avons consulté votre profil et nous recherchons un développeur frontend senior pour rejoindre notre équipe.",
      "Technologies : React, TypeScript, Google Cloud Platform.",
      "Localisation : Paris ou Mountain View.",
      "Salaire : 120-180k€ selon expérience.",
      "Intéressé par cette opportunité ?",
      "Cordialement,",
      "Équipe Recrutement Google"
    ],
    time: "À l'instant",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg"
  };

  if (!isVisible) return null;

  // Calculer la position verticale selon l'index
  const topOffset = 4 + (index * 4); // 4px de base + 4px par popup pour une superposition plus importante
  const rightOffset = isExpanded ? 16 : 4; // Décalage plus important vers la gauche si étendu
  
  // Vérifier si le popup dépasse de l'écran et ajuster la position
  const maxTopOffset = window.innerHeight - 200; // 200px de marge en bas
  const adjustedTopOffset = Math.min(topOffset, maxTopOffset);

  // Ajuster la position pour mobile
  const isMobile = window.innerWidth < 768;
  const mobileTopOffset = isMobile ? 1 : adjustedTopOffset; // Plus proche du haut sur mobile
  const mobileRightOffset = isMobile ? 1 : rightOffset; // Plus proche du bord droit sur mobile

  return (
    <div 
      className="fixed transition-all duration-300 ease-out" 
      data-popup="true"
      style={{ 
        top: `${mobileTopOffset}rem`, 
        right: `${mobileRightOffset}rem`, 
        zIndex: 50 + index // Z-index normal basé sur l'index, pas de changement quand étendu
      }}
    >
      {/* Petit popup de notification */}
      <div 
        className={`${isMobile ? 'w-72' : 'w-80'} rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out ${
          isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{
          backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-primary-bg)',
          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
          border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
        }}
      >
        {/* Email Content compact */}
        <div className="p-3 relative">
          {/* Sender Info compact - cliquable pour étendre */}
          <div 
            className={`flex items-center gap-2 mb-3 ${totalPopups > 1 && !isLastPopup ? 'cursor-pointer' : ''}`}
            onClick={totalPopups > 1 && !isLastPopup ? onToggleExpanded : undefined}
          >
            <img 
              src={emailData.senderAvatar || emailData.avatar} 
              alt={emailData.sender}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm truncate flex-1 mr-2">{emailData.sender}</h4>
                <div className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
                  <FiClock className="text-xs" />
                  <span className="whitespace-nowrap">{emailData.date || emailData.time}</span>
                </div>
              </div>
              <p className="text-xs truncate" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
                {emailData.email}
              </p>
            </div>
          </div>

          {/* Subject et contenu compact */}
          <div className="mb-3">
            <h5 className="font-semibold text-sm mb-1" style={{ color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
              {emailData.title}
            </h5>
            <p className="text-xs truncate" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
              {emailData.content && emailData.content[1] ? emailData.content[1] : emailData.content && emailData.content[0] ? emailData.content[0] : ''}
            </p>
          </div>

          {/* Actions compactes */}
          <div className="flex gap-2 pt-2" style={{ borderTop: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}` }}>
            <button
              className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--button-bg)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--button-bg)';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={onViewEmail}
            >
              Voir
            </button>
            <button
              className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : '#e5e7eb',
                color: darkMode ? 'var(--dark-text)' : '#374151'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? '#404040' : '#d1d5db';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? 'var(--dark-secondary-bg)' : '#e5e7eb';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup; 