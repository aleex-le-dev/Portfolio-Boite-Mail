import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const Banner = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Obtenir la date d'aujourd'hui
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className={`fixed top-0 left-0 right-0 z-[9999] w-full py-3 px-4 text-center relative overflow-hidden ${darkMode ? 'bg-blue-900 text-white' : 'bg-blue-600 text-white'}`}>
      {/* Animation de défilement */}
      <div className="animate-marquee whitespace-nowrap" style={{ paddingLeft: '60px', paddingRight: '80px' }}>
        <span className="inline-block mx-4">🚧 Portfolio toujours en cours de construction <span className="text-xs">({formattedDate})</span> 🚧</span>
        <span className="inline-block mx-4">🚧 Portfolio toujours en cours de construction <span className="text-xs">({formattedDate})</span> 🚧</span>
        <span className="inline-block mx-4">🚧 Portfolio toujours en cours de construction <span className="text-xs">({formattedDate})</span> 🚧</span>
        <span className="inline-block mx-4">🚧 Portfolio toujours en cours de construction <span className="text-xs">({formattedDate})</span> 🚧</span>
        <span className="inline-block mx-4">🚧 Portfolio toujours en cours de construction <span className="text-xs">({formattedDate})</span> 🚧</span>
        <span className="inline-block mx-4">🚧 Portfolio toujours en cours de construction <span className="text-xs">({formattedDate})</span> 🚧</span>
      </div>
      
      {/* Bouton fermer */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 transition"
        aria-label="Fermer la bannière"
      >
        <MdClose className="text-xl text-white" />
      </button>
    </div>
  );
};

export default Banner;