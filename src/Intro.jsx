import React, { useEffect, useState } from "react";

// Composant Intro animé (cube, transition, etc.)
// Utilisation : <Intro onFinish={() => ...} />
function Intro({ onFinish }) {
  const [step, setStep] = useState(0); // 0: cube, 1: transition, 2: terminé

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 2200); // cube anim
    } else if (step === 1) {
      setTimeout(() => setStep(2), 700); // color transition
    } else if (step === 2 && onFinish) {
      onFinish();
    }
  }, [step, onFinish]);

  if (step === 0) return <Win10Intro />;
  if (step === 1) return <div className="dev3d-color-transition" />;
  return null;
}

// Composant visuel du cube animé
function Win10Intro() {
  return (
    <div className="dev3d-intro-bg">
      <div className="dev3d-cube-scene">
        <div className="dev3d-cube">
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

// Desktop Windows 10 (non utilisé actuellement)
export function Win10Desktop() {
  return (
    <div className="win10-desktop-bg">
    </div>
  );
}

export default Intro; 