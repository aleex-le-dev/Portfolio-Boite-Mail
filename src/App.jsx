import React, { useState, useRef, useEffect } from "react";
import "./intro.css";
import BoiteMail from "./composants/BoiteMail";
import Intro from "./Intro";
import CookieBanner from "./composants/CookieBanner";
import Banner from "./composants/Banner";

function App() {
  const boiteMailRef = useRef();
  const [introDone, setIntroDone] = useState(true);
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
    <>
      {!introDone && !showTransition && <Intro onFinish={handleIntroFinish} />}
      {showTransition && <div className="mailbox-transition" />}
      {introDone && <Banner darkMode={darkMode} />}
      {introDone && <BoiteMail ref={boiteMailRef} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} onTitleChange={setPageTitle} />}
      {introDone && <CookieBanner onShowInfo={handleShowInfoMail} darkMode={darkMode} />}
    </>
  );
}

export default App;
