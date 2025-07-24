import React, { useState, useEffect } from "react";
import BoiteMail from "./composants/BoiteMail";

// Composant principal qui affiche la boîte mail du portfolio
function App() {
  return <>
    <BoiteMail />
    <CookieBanner />
  </>;
}

export default App;

// Bannière cookie professionnelle
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookieAccepted')) setVisible(true);
  }, []);
  const accept = () => {
    localStorage.setItem('cookieAccepted', '1');
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center cookie-banner-animate">
      <div className="bg-white border border-gray-300 shadow-lg rounded-t-xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 max-w-2xl w-full md:w-auto">
        <span className="text-gray-700 text-sm flex-1">Ce site utilise le stockage local de votre navigateur pour améliorer votre expérience. Aucune donnée n’est transmise à des tiers. <a href="#" className="underline hover:text-blue-700">En savoir plus</a></span>
        <button onClick={accept} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition">J'ai compris</button>
      </div>
    </div>
  );
};
