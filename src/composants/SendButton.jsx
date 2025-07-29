import React, { useState } from 'react';

// Composant bouton d'envoi animé avec effet de vol
// Utilisation : <SendButton onClick={...} disabled={...} />
const SendButton = ({ onClick, disabled = false, children = "Envoyer", className = "", errorMessage = "Vous devez remplir tous les champs", errorTop = "20%" }) => {
  const [showError, setShowError] = useState(false);

  const handleClick = (e) => {
    console.log('Bouton cliqué, disabled:', disabled);
    if (disabled) {
      e.preventDefault();
      console.log('Bouton désactivé, affichage du message d\'erreur');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    onClick && onClick(e);
  };

  return (
    <>
      <button 
        onClick={handleClick} 
        className={`send-button ${className}`}
        style={{ 
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          background: disabled ? '#6b7280' : 'var(--button-bg, #3b82f6)'
        }}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>{children}</span>
      </button>
      
      {showError && (
        <div 
          style={{
            position: 'fixed',
            top: errorTop,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '12px 20px',
            background: '#dc2626',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            zIndex: 10001,
            whiteSpace: 'nowrap',
            border: '2px solid #b91c1c',
            minWidth: 'max-content'
          }}
        >
          ⚠️ {errorMessage}
        </div>
      )}
    </>
  );
};

export default SendButton;