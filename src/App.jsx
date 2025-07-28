import React, { useState, useRef } from "react";
import "./intro.css";
import BoiteMail from "./composants/BoiteMail";
import Intro from "./Intro";
import CookieBanner from "./composants/CookieBanner";

function App() {
  const boiteMailRef = useRef();
  const [introDone, setIntroDone] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

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

  return (
    <>
      {!introDone && !showTransition && <Intro onFinish={handleIntroFinish} />}
      {showTransition && <div className="mailbox-transition" />}
      {introDone && <BoiteMail ref={boiteMailRef} />}
      {introDone && <CookieBanner onShowInfo={handleShowInfoMail} />}
    </>
  );
}

export default App;
