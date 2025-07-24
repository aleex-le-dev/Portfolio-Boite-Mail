import React, { useEffect, useState } from "react";

// Composant Intro animé (cube, transition, etc.)
// Utilisation : <Intro onFinish={() => ...} />
function Intro({ onFinish }) {
  return <MailRainIntro onFinish={onFinish} />;
}

// Composant visuel pluie d'enveloppes animées (canvas)
function MailRainCanvas({ onFinish }) {
  const [displayed, setDisplayed] = useState("");
  const [displayed2, setDisplayed2] = useState("");
  const [phase, setPhase] = useState(0); // 0: premier texte, 1: efface, 2: second texte
  const welcome = "Bienvenue sur salutalex.fr";
  const launch = "Lancement de la boite mail";

  useEffect(() => {
    const canvas = document.getElementById('mailrain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    // Génération des enveloppes
    const envelopes = Array.from({length: 36}, () => ({
      x: Math.random()*w,
      y: -60-Math.random()*h,
      z: 0.7+Math.random()*0.7,
      speed: 2+Math.random()*3,
      rot: Math.random()*2*Math.PI,
      rotSpeed: (Math.random()-0.5)*0.04
    }));
    let anim;
    function drawEnvelope(ctx, x, y, scale, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      // Corps de l'enveloppe
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#00adef';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-32, -20);
      ctx.lineTo(32, -20);
      ctx.lineTo(32, 20);
      ctx.lineTo(-32, 20);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Rabat
      ctx.beginPath();
      ctx.moveTo(-32, -20);
      ctx.lineTo(0, 8);
      ctx.lineTo(32, -20);
      ctx.closePath();
      ctx.fillStyle = '#00adef';
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.stroke();
      ctx.restore();
    }
    function draw() {
      ctx.clearRect(0,0,w,h);
      // Effet de lumière
      const grad = ctx.createRadialGradient(w/2,h*0.2,40,w/2,h*0.2,w*0.7);
      grad.addColorStop(0,'#fff');
      grad.addColorStop(0.2,'#00adef88');
      grad.addColorStop(1,'#00111a00');
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,w,h);
      ctx.restore();
      // Enveloppes
      for (let env of envelopes) {
        drawEnvelope(ctx, env.x, env.y, env.z, env.rot);
        env.y += env.speed*env.z;
        env.rot += env.rotSpeed;
        if (env.y > h+40) {
          env.x = Math.random()*w;
          env.y = -60-Math.random()*h*0.3;
          env.z = 0.7+Math.random()*0.7;
          env.speed = 2+Math.random()*3;
          env.rot = Math.random()*2*Math.PI;
        }
      }
      anim = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(anim);
  }, []);

  // Effet machine à écrire pour le texte
  useEffect(() => {
    if (phase === 0 && displayed.length < welcome.length) {
      const t = setTimeout(() => setDisplayed(welcome.slice(0, displayed.length+1)), 80);
      return () => clearTimeout(t);
    }
    if (phase === 0 && displayed.length === welcome.length) {
      const t = setTimeout(() => setPhase(1), 900);
      return () => clearTimeout(t);
    }
    if (phase === 1) {
      const t = setTimeout(() => setDisplayed(""), 250);
      const t2 = setTimeout(() => setPhase(2), 300);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
    if (phase === 2 && displayed2.length < launch.length) {
      const t = setTimeout(() => setDisplayed2(launch.slice(0, displayed2.length+1)), 80);
      return () => clearTimeout(t);
    }
    // Fin de l'intro après affichage complet du second texte
    if (phase === 2 && displayed2.length === launch.length) {
      const t = setTimeout(() => setPhase(3), 2500);
      return () => clearTimeout(t);
    }
  }, [displayed, displayed2, phase]);

  useEffect(() => {
    if (phase === 3 && typeof onFinish === 'function') {
      onFinish();
    }
  }, [phase, onFinish]);

  return (
    <div className="mailrain-intro-bg">
      <canvas id="mailrain-canvas" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:1000}} />
      <div className="mailrain-title mailrain-terminal mailrain-stack">
        <div className="mailrain-line1">
          <span>{welcome}</span>
        </div>
        <div className="mailrain-line2">
          <span>{displayed2}{phase === 2 && displayed2.length < launch.length ? <span className="mailrain-cursor">█</span> : null}</span>
        </div>
      </div>
    </div>
  );
}

// Composant d'animation spectaculaire thème boîte mail (pluie d'enveloppes 3D)
// Utilisation : <MailRainIntro onFinish={() => ...} />
function MailRainIntro({ onFinish }) {
  return <MailRainCanvas onFinish={onFinish} />;
}

export default Intro;
export { MailRainIntro }; 