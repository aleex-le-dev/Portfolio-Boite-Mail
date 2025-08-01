import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR, USER_EMAIL } from './constantes';
import projetsData from './projets.json';
import timelineData from './timeline.json';

export default function AProposDeMoi({ darkMode }) {
  const navigate = useNavigate();
  const [sectionsVisible, setSectionsVisible] = useState({
    about: false,
    skills: false,
    languages: false
  });
  const [timelineVisible, setTimelineVisible] = useState(new Set());
  const [lineProgress, setLineProgress] = useState(0);

  // Reset et remettre en haut lors de l'actualisation
  useEffect(() => {
    // Désactiver temporairement le scroll automatique du navigateur
    const originalScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    
    // Forcer le retour en haut de page une seule fois
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Scroll immédiat
    scrollToTop();
    
    // Scroll après un court délai pour s'assurer que le DOM est prêt
    setTimeout(scrollToTop, 100);
    
    // Reset toutes les animations
    setSectionsVisible({
      about: false,
      skills: false,
      languages: false
    });
    setTimelineVisible(new Set());
    setLineProgress(0);
    
    // Restaurer le comportement normal après un délai
    setTimeout(() => {
      history.scrollRestoration = originalScrollRestoration;
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Animation des sections principales
      const aboutSection = document.querySelector('.about-section');
      const skillsSection = document.querySelector('.skills-section');
      const languagesSection = document.querySelector('.languages-section');
      const timelineSection = document.querySelector('.timeline-section');

      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        // Apparition au niveau 2/10 de l'écran (vers le haut)
        if (aboutRect.top <= window.innerHeight * 0.2 && !sectionsVisible.about) {
          setSectionsVisible(prev => ({ ...prev, about: true }));
        }
      }

      if (skillsSection) {
        const skillsRect = skillsSection.getBoundingClientRect();
        // Apparition au niveau 2/10 de l'écran (vers le haut)
        if (skillsRect.top <= window.innerHeight * 0.2 && !sectionsVisible.skills) {
          setSectionsVisible(prev => ({ ...prev, skills: true }));
        }
      }

      if (languagesSection) {
        const languagesRect = languagesSection.getBoundingClientRect();
        // Apparition au niveau 2/10 de l'écran (vers le haut)
        if (languagesRect.top <= window.innerHeight * 0.2 && !sectionsVisible.languages) {
          setSectionsVisible(prev => ({ ...prev, languages: true }));
        }
      }

      // Animation de la timeline
      if (timelineSection) {
        const timelineRect = timelineSection.getBoundingClientRect();
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Calculer la progression de la ligne de manière plus fluide
        if (timelineRect.top <= window.innerHeight * 0.8) {
          // Calculer la progression basée sur la position de la timeline dans le viewport
          const timelineStart = window.innerHeight * 0.8;
          const timelineEnd = window.innerHeight * 0.2;
          const timelineRange = timelineStart - timelineEnd;
          
          if (timelineRect.top <= timelineEnd) {
            // Timeline complètement visible, progression à 100%
            setLineProgress(1);
          } else {
            // Progression fluide basée sur la position
            const progress = Math.max(0, Math.min(1, (timelineStart - timelineRect.top) / timelineRange));
            setLineProgress(progress);
          }
        } else {
          setLineProgress(0);
        }
        
        timelineItems.forEach((item, index) => {
          // Calculer la position relative de l'élément dans la timeline (0 à 1)
          const elementPosition = index / (timelineItems.length - 1);
          
          // L'élément s'affiche avec une petite marge pour plus de fluidité
          if (lineProgress >= (elementPosition - 0.02) && !timelineVisible.has(index)) {
            setTimelineVisible(prev => new Set([...prev, index]));
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionsVisible, timelineVisible, lineProgress]);

  // Fonction pour extraire les technologies du contenu
  const extractTechnologies = (content) => {
    const techLine = content.find(line => line.includes('Technologies utilisées :'));
    if (techLine) {
      const techMatch = techLine.match(/Technologies utilisées :\s*(.+)/);
      if (techMatch) {
        return techMatch[1].split('•').map(tech => tech.trim()).filter(tech => tech);
      }
    }
    return [];
  };

  // Fonction pour extraire la description du contenu
  const extractDescription = (content) => {
    return content[0] || '';
  };

  const getIconForCategory = (categorie) => {
    switch (categorie) {
      case 'experience':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        );
      case 'formation':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getColorForCategory = (categorie) => {
    switch (categorie) {
      case 'experience':
        return 'rgb(59, 130, 246)'; // blue-500
      case 'formation':
        return 'rgb(34, 197, 94)'; // green-500
      default:
        return 'rgb(107, 114, 128)'; // gray-500
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-primary-bg)' }}>
      {/* Bouton de retour */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mb-6"
          style={{ 
            backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
            color: darkMode ? '#fff' : 'var(--light-text)',
            border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au portfolio
        </button>
      </div>

      {/* En-tête avec photo et informations */}
      <div 
        className="py-12"
        style={{ 
          backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
          borderBottom: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
          color: darkMode ? '#fff' : 'var(--light-text)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo de profil */}
            <div className="flex-shrink-0">
              <img 
                src={USER_AVATAR} 
                alt="Alexandre Janacek" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Informations principales */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Alexandre Janacek</h1>
              <p className="text-xl mb-4" style={{ color: darkMode ? '#fff' : undefined }}>
                Concepteur Développeur d&apos;Applications
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {/* From Uiverse.io by Itskrish01 */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                  <defs>
                    <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
                    </clipPath>
                  </defs>
                </svg>

                <div className="relative">
                  <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
                  ></div>

                  <div className="social-icons-container relative flex items-end gap-x-2 p-2">
                    {/* Email */}
                    <div className="relative">
                      <a
                        href={`mailto:${USER_EMAIL}`}
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl block"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </a>
                    </div>

                    {/* LinkedIn */}
                    <div className="relative">
                      <a
                        href="https://linkedin.com/in/alexandre-janacek"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl block"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>

                    {/* GitHub */}
                    <div className="relative">
                      <a
                        href="https://github.com/aleex-le-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl block"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/src/assets/CV Alexandre_Janacek_Concepteur_Développeur.png';
                        link.download = 'CV_Alexandre_Janacek_Concepteur_Developpeur.png';
                        link.click();
                      }}
                      className="cursor-pointer group relative flex items-center justify-center gap-1.5 w-10 h-10 bg-black bg-opacity-80 text-[#f1f1f1] rounded-xl hover:bg-opacity-70 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl font-semibold shadow-md"
                    >
                      <span className="text-s cursor-pointer">CV</span>
               
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-12" style={{ color: darkMode ? '#fff' : undefined }}>
        <div className="space-y-8">
          {/* Section À propos et Compétences */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* À propos */}
            <div className="md:col-span-2">
              <section 
                className={`about-section rounded-xl p-6 shadow-lg transition-all duration-1000 ease-out ${
                  sectionsVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                  border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                  color: darkMode ? '#fff' : undefined
                }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"/>
                    </svg>
                  </div>
                  À propos de moi
                </h2>
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed mb-4">
                    Passionné par le développement web et les nouvelles technologies, je suis un concepteur développeur d&apos;applications 
                    avec une expertise particulière dans les frameworks modernes comme React, Vue.js et Node.js.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                    Mon approche combine créativité technique et rigueur méthodologique pour créer des solutions innovantes 
                    et performantes. Je m&apos;efforce constamment d&apos;améliorer mes compétences et de rester à jour avec 
                    les dernières tendances du développement web.
                  </p>
                  <p className="text-lg leading-relaxed">
                    En dehors du code, j&apos;apprécie les voyages et la découverte de nouvelles cultures, 
                    ce qui enrichit ma perspective créative dans mes projets de développement.
                  </p>
                </div>
              </section>
            </div>

            {/* Compétences, Langues et Contact */}
            <div className="space-y-9">
              <section 
                className={`skills-section rounded-xl p-6 shadow-lg transition-all duration-1000 ease-out delay-200 ${
                  sectionsVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                  border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                  color: darkMode ? '#fff' : undefined
                }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  Compétences
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)' }}>
                      <img 
                        src="/src/assets/icone/React_light.svg" 
                        alt="React" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium">React</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)' }}>
                      <img 
                        src="/src/assets/icone/javascript.svg" 
                        alt="JavaScript" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium">JavaScript</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)' }}>
                      <img 
                        src="/src/assets/icone/wordpress.svg" 
                        alt="WordPress" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium">WordPress</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)' }}>
                      <img 
                        src="/src/assets/icone/adobe.svg" 
                        alt="Pack Office" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium">Pack Office</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)' }}>
                      <img 
                        src="/src/assets/icone/figma.svg" 
                        alt="Figma" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium">Figma</span>
                  </div>
                </div>
              </section>

              {/* Langues */}
              <section 
                className={`languages-section rounded-xl p-6 shadow-lg transition-all duration-1000 ease-out delay-400 ${
                  sectionsVisible.languages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                  border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                  color: darkMode ? '#fff' : undefined
                }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  Langues
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Français</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Langue maternelle</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Anglais</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Intermédiaire</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Espagnol</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Notions</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Timeline personnalisée moderne */}
          <section 
            className="timeline-section rounded-xl p-6 shadow-lg w-full"
            style={{ 
              backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
              border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
              color: darkMode ? '#fff' : undefined
            }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              Parcours Professionnel
            </h2>
            
            <div className="relative">
              {/* Ligne centrale de base */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
                style={{ 
                  backgroundColor: darkMode ? '#4B5563' : '#E5E7EB'
                }}
              ></div>
              
              {/* Ligne qui progresse */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-1 transition-all duration-500 ease-in-out"
                style={{ 
                  backgroundColor: darkMode ? '#3B82F6' : '#2563EB',
                  height: `${lineProgress * 100}%`,
                  boxShadow: lineProgress > 0 ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                }}
              ></div>
              
                                            {/* Éléments de la timeline */}
               <div className="space-y-8">
                                   {(() => {
                    // Créer un Map pour suivre les années déjà affichées
                    const displayedYears = new Map();
                    
                    return timelineData.timeline.map((item, index) => {
                      // Extraire la deuxième année si c'est une plage (ex: "2016-2017" -> "2017")
                      let displayYear = item.annee;
                      if (item.annee.includes('-') && item.annee !== "Aujourd'hui") {
                        const years = item.annee.split('-').map(y => y.trim());
                        const numericYears = years.filter(y => !isNaN(parseInt(y)));
                        if (numericYears.length > 0) {
                          displayYear = Math.max(...numericYears.map(y => parseInt(y))).toString();
                        }
                      }
                      
                      // Vérifier si cette année a déjà été affichée
                      const shouldShowYear = !displayedYears.has(displayYear);
                      if (shouldShowYear) {
                        displayedYears.set(displayYear, index);
                      }
                     
                     return (
                       <div 
                         key={item.id}
                         className={`timeline-item relative flex items-center transition-all duration-700 ease-out ${
                           timelineVisible.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                         }`}
                         style={{ transitionDelay: `${index * 200}ms` }}
                       >
                         {/* Contenu */}
                         <div 
                           className={`w-5/12 p-6 rounded-lg shadow-lg ${
                             item.categorie === 'experience' ? 'mr-auto' : 'ml-auto'
                           }`}
                           style={{ 
                             backgroundColor: darkMode ? '#374151' : '#ffffff',
                             color: darkMode ? '#ffffff' : '#000000',
                             border: `1px solid ${darkMode ? '#4B5563' : '#E5E7EB'}`
                           }}
                         >
                           <div className="flex items-center gap-3 mb-3">
                             <div 
                               className="w-8 h-8 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: getColorForCategory(item.categorie) }}
                             >
                               {getIconForCategory(item.categorie)}
                             </div>
                             <div>
                               <h3 className="font-bold text-lg">{item.titre}</h3>
                               <p className="text-sm text-gray-600 dark:text-gray-400">
                                 {item.entreprise || item.organisme} • {item.lieu}
                               </p>
                             </div>
                           </div>
                           
                           <div className="mb-3">
                             <span 
                               className="px-3 py-1 rounded-full text-xs font-semibold"
                               style={{ 
                                 backgroundColor: getColorForCategory(item.categorie),
                                 color: '#ffffff'
                               }}
                             >
                               {item.annee}
                             </span>
                           </div>
                           
                           <ul className="space-y-2">
                             {item.missions.map((mission, missionIndex) => (
                               <li key={missionIndex} className="text-sm flex items-start">
                                 <span className="text-blue-500 mr-2 mt-1">•</span>
                                 <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                   {mission}
                                 </span>
                               </li>
                             ))}
                           </ul>
                         </div>
                         
                         {/* Point central */}
                         <div 
                           className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full shadow-lg border-2 border-white"
                           style={{ backgroundColor: getColorForCategory(item.categorie) }}
                         ></div>
                         
                                                   {/* Année sur la ligne centrale - seulement si c'est la première occurrence */}
                          {shouldShowYear && (
                            <div 
                              className={`absolute left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-bold shadow-lg border transition-all duration-300 ${
                                timelineVisible.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                              }`}
                              style={{ 
                                backgroundColor: darkMode ? '#1F2937' : '#ffffff',
                                color: darkMode ? '#ffffff' : '#000000',
                                borderColor: darkMode ? '#4B5563' : '#E5E7EB',
                                top: '-8px'
                              }}
                            >
                              {displayYear}
                            </div>
                          )}
                       </div>
                     );
                   });
                 })()}
               </div>
            </div>
          </section>

          {/* Projets récents */}
          <section 
            className="rounded-xl p-6 shadow-lg"
            style={{ 
              backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
              border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
              color: darkMode ? '#fff' : undefined
            }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              Projets Récents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projetsData.slice(0, 2).map((projet) => {
                const technologies = extractTechnologies(projet.content);
                const description = extractDescription(projet.content);
                
                return (
                  <div 
                    key={projet.id}
                    className="p-4 rounded-lg border cursor-pointer hover:shadow-lg transition-shadow"
                    style={{ 
                      backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                      borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)',
                      color: darkMode ? '#fff' : undefined
                    }}
                    onClick={() => window.location.href = `mailto:${projet.email}`}
                  >
                    <h3 className="font-semibold mb-2">{projet.title}</h3>
                    <p className="text-sm mb-3" style={{ color: darkMode ? '#fff' : undefined }}>
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)',
                            color: darkMode ? '#fff' : undefined
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 