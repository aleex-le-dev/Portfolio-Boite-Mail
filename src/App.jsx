import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./intro.css";
import BoiteMail from "./composants/BoiteMail";
import Intro from "./Intro";
import CookieBanner from "./composants/CookieBanner";
import AProposDeMoi from "./composants/AProposDeMoi";

function App() {
  const boiteMailRef = useRef();
  const [introDone, setIntroDone] = useState(false); // false pour afficher l'intro, true pour afficher la boîte mail
  const [showTransition, setShowTransition] = useState(false);
  const [pageTitle, setPageTitle] = useState("Aleex-le-dev Développeur Web | Lillers & Béthune");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Mettre à jour le titre de la page
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleShowInfoMail = () => {
    if (boiteMailRef.current && boiteMailRef.current.selectInfoMail) {
      boiteMailRef.current.selectInfoMail();
    }
  };

  const handleIntroFinish = () => {
    setShowTransition(true);
    // Démarrer la transition bleue
    setTimeout(() => {
      setIntroDone(true);
      setShowTransition(false);
    }, 1000); // Durée de la transition
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (
    <Router>
      {!introDone && !showTransition && <Intro onFinish={handleIntroFinish} />}
      {showTransition && <div className="mailbox-transition" />}
      {introDone && (
        <Routes>
          <Route path="/" element={<BoiteMail ref={boiteMailRef} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} onTitleChange={setPageTitle} />} />
          <Route path="/a-propos" element={<AProposDeMoi darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
      {introDone && <CookieBanner onShowInfo={handleShowInfoMail} darkMode={darkMode} />}
    </Router>
  );
}

export default App;
