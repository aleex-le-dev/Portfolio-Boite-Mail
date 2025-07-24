import React, { useState, useRef } from "react";
import "./intro.css";
import BoiteMail from "./composants/BoiteMail";
// import Intro from "./Intro";
import CookieBanner from "./composants/CookieBanner";

function App() {
  const boiteMailRef = useRef();
  // const [introDone, setIntroDone] = useState(false);

  const handleShowInfoMail = () => {
    if (boiteMailRef.current && boiteMailRef.current.selectInfoMail) {
      boiteMailRef.current.selectInfoMail();
    }
  };

  // if (!introDone) return <Intro onFinish={() => setIntroDone(true)} />;

  return (
    <>
      <BoiteMail ref={boiteMailRef} />
      <CookieBanner onShowInfo={handleShowInfoMail} />
    </>
  );
}

export default App;
