import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiUser, FiClock } from 'react-icons/fi';

const EmailPopup = ({ isVisible, onClose, darkMode, emailData: propEmailData }) => {


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

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Petit popup de notification */}
      <div 
        className={`w-80 rounded-xl shadow-2xl overflow-hidden ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
                            {/* Email Content compact */}
                    <div className="p-3 relative">
                                {/* Sender Info compact */}
                      <div className="flex items-center gap-2 mb-3">
                        <img 
                          src={emailData.senderAvatar || emailData.avatar} 
                          alt={emailData.sender}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm truncate">{emailData.sender}</h4>
                                                    <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <FiClock className="text-xs" />
                          {emailData.date || emailData.time}
                        </div>
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                            {emailData.email}
                          </p>
                        </div>
                      </div>

          {/* Subject et contenu compact */}
          <div className="mb-3">
            <h5 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
              {emailData.title}
            </h5>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                          {emailData.content && emailData.content[1] ? emailData.content[1] : emailData.content && emailData.content[0] ? emailData.content[0] : ''}
                        </p>
          </div>

          {/* Actions compactes */}
          <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <button
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                            darkMode 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          Voir
                        </button>
            <button
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
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