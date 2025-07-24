import React, { useState, useEffect, useRef } from "react";
import "./Win10Intro.css";
import BoiteMail from "./composants/BoiteMail";

// Composant principal qui affiche la boîte mail du portfolio
function App() {
  const boiteMailRef = useRef();
  const [introStep, setIntroStep] = useState(0); // 0: cube, 1: zoom, 2: transition, 3: app

  useEffect(() => {
    if (introStep === 0) {
      setTimeout(() => setIntroStep(1), 2200); // cube anim
    } else if (introStep === 1) {
      setTimeout(() => setIntroStep(2), 1100); // zoom
    } else if (introStep === 2) {
      setTimeout(() => setIntroStep(3), 700); // color transition
    }
  }, [introStep]);

  const handleShowInfoMail = () => {
    if (boiteMailRef.current && boiteMailRef.current.selectInfoMail) {
      boiteMailRef.current.selectInfoMail();
    }
  };

  return (
    <>
      {introStep === 0 && <Win10Intro />}
      {introStep === 1 && <Win10Intro zoom />}
      {introStep === 2 && <div className="dev3d-color-transition" />}
      {introStep === 3 && (
        <>
          <BoiteMail ref={boiteMailRef} />
          <CookieBanner onShowInfo={handleShowInfoMail} />
        </>
      )}
    </>
  );
}

export default App;

// Bannière cookie professionnelle
const CookieBanner = ({ onShowInfo }) => {
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
        <span className="text-gray-700 text-sm flex-1">Ce site utilise le stockage local de votre navigateur pour améliorer votre expérience. Aucune donnée n’est transmise à des tiers. <button type="button" className="underline hover:text-blue-700" onClick={onShowInfo}>En savoir plus</button></span>
        <button onClick={accept} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition">J'ai compris</button>
      </div>
    </div>
  );
};

// Animation Windows 10 style
function Win10Intro({ zoom }) {
  return (
    <div className={`dev3d-intro-bg${zoom ? ' dev3d-intro-zoom' : ''}`}>
      <div className={`dev3d-cube-scene${zoom ? ' dev3d-cube-zoom' : ''}`}>
        <div className={`dev3d-cube${zoom ? ' dev3d-cube-zoomed' : ''}`}>
          <div className="dev3d-face dev3d-face-front flex items-center justify-center">
            <span style={{fontSize: '3.5rem', color: '#fff', fontWeight: 700, textShadow: '0 2px 16px #00adef99'}}>S</span>
          </div>
          <div className="dev3d-face dev3d-face-back" />
          <div className="dev3d-face dev3d-face-right" />
          <div className="dev3d-face dev3d-face-left" />
          <div className="dev3d-face dev3d-face-top" />
          <div className="dev3d-face dev3d-face-bottom" />
        </div>
      </div>
      <div className="dev3d-title">
        <span>salutalex.fr</span>
      </div>
    </div>
  );
}

function Win10Desktop() {
  return (
    <div className="win10-desktop-bg">
    </div>
  );
}
