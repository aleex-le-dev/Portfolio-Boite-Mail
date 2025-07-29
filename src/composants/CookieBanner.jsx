import React, { useState, useEffect } from "react";

// Bannière cookie professionnelle
// Utilisation : <CookieBanner onShowInfo={...} darkMode={...} />
function CookieBanner({ onShowInfo, darkMode = false }) {
  const [visible, setVisible] = useState(false);
  
  // Fonction pour activer Google Analytics
  const enableAnalytics = () => {
    // Activer Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({'event': 'cookie_consent_accepted'});
    }
    
    // Activer le script GTM si il était désactivé
    const gtmScript = document.querySelector('script[src*="googletagmanager.com"]');
    if (gtmScript) {
      gtmScript.disabled = false;
    }
  };

  // Fonction pour désactiver Google Analytics
  const disableAnalytics = () => {
    // Désactiver Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({'event': 'cookie_consent_refused'});
    }
    
    // Désactiver le script GTM
    const gtmScript = document.querySelector('script[src*="googletagmanager.com"]');
    if (gtmScript) {
      gtmScript.disabled = true;
    }
    
    // Supprimer les cookies de tracking existants
    const cookiesToRemove = ['_ga', '_gid', '_gat', '_ga_GTM-N96FZ3N7'];
    cookiesToRemove.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };
  
  const handleAccept = () => {
    localStorage.setItem('cookiecheck', 'accepted');
    enableAnalytics();
    console.log('✅ Cookies acceptés - Google Analytics ACTIVÉ');
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('cookiecheck', 'refused');
    disableAnalytics();
    setVisible(false);
  };

  // Vérifier le choix précédent au chargement
  useEffect(() => {
    const cookieStatus = localStorage.getItem('cookiecheck');
    
    if (!cookieStatus || cookieStatus === 'no_clicked') {
      // Aucun choix fait, afficher la bannière
      setVisible(true);
    } else if (cookieStatus === 'accepted') {
      // Cookies acceptés, activer Google Analytics
      enableAnalytics();
      setVisible(false);
    } else if (cookieStatus === 'refused') {
      // Cookies refusés, désactiver Google Analytics
      disableAnalytics();
      setVisible(false);
    }
  }, []);

  if (!visible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] flex justify-center cookie-banner-animate">
      <div className={`border shadow-lg rounded-t-xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 max-w-2xl w-full md:w-auto ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : {}}>
        <div className="flex items-center gap-3 flex-1">
          <span className="text-4xl">🍪</span>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ce site utilise des cookies et le stockage local pour améliorer votre expérience et analyser le trafic. <button type="button" className={`underline hover:text-blue-400 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`} onClick={onShowInfo}>En savoir plus</button></span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleRefuse} className={`font-semibold rounded-lg px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${darkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}`}>Refuser</button>
          <button onClick={handleAccept} className={`font-semibold rounded-lg px-6 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`} style={darkMode ? { backgroundColor: 'var(--button-bg)' } : {}}>J'accepte</button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner; 