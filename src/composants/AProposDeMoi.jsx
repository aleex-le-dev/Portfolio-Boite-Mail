import React from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR, USER_EMAIL } from './constantes';
import projetsData from './projets.json';

export default function AProposDeMoi({ darkMode }) {
  const navigate = useNavigate();

  // Fonction pour extraire les technologies du contenu
  const extractTechnologies = (content) => {
    const techLine = content.find(line => line.includes('Technologies utilisées :'));
    if (techLine) {
      const techIndex = content.indexOf(techLine);
      const nextLine = content[techIndex + 1];
      if (nextLine && nextLine.includes('•')) {
        return nextLine.split('•').slice(1).map(tech => tech.trim());
      }
    }
    return [];
  };

  // Fonction pour extraire la description (première ligne du contenu)
  const extractDescription = (content) => {
    return content[0] || '';
  };

  return (
    <div 
      className={`min-h-screen${darkMode ? ' text-white' : ''}`}
      style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-primary-bg)' }}
    >
      {/* Bouton de retour */}
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-6">
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

      {/* Header avec photo de profil */}
      <div 
        className="max-w-4xl mx-auto px-6 py-12"
        style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? '#fff' : undefined }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Photo de profil */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-xl">
              <img 
                src={USER_AVATAR} 
                alt="Alexandre Janacek" 
                className="w-full h-full object-cover"
              />
            </div>
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

                <div className="relative flex items-end gap-x-2 p-2">
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

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-12" style={{ color: darkMode ? '#fff' : undefined }}>
        <div className="space-y-8">
          {/* Section À propos et Compétences */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* À propos */}
            <div className="md:col-span-2">
              <section 
                className="rounded-xl p-6 shadow-lg"
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
                className="rounded-xl p-6 shadow-lg"
                style={{ 
                  backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                  border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`,
                  color: darkMode ? '#fff' : undefined
                }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  Compétences
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)' }}>
                      <img 
                        src={darkMode ? '/src/assets/icone/React_dark.svg' : '/src/assets/icone/React_light.svg'} 
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
                className="rounded-xl p-6 shadow-lg"
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

          {/* Timeline Expérience et Formation */}
          <section 
            className="rounded-xl p-6 shadow-lg w-full"
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
            
            {/* Timeline centrale */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 to-orange-500 rounded-full shadow-lg"></div>
              
              <div className="space-y-12">
                {/* 2022-2024 */}
                <div className="relative flex items-center">
                  {/* Expérience à gauche */}
                  <div className="w-5/12 pr-8">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Développeur Web Full Stack
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          2022-2024
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-blue-600 mb-2">Maisoncléo - Lille (59)</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Création de nouvelles fonctionnalités en PHP/JS/MySQL</li>
                        <li>• Utilisation de Wordpress avec Git</li>
                        <li>• Développement d&apos;applications web modernes</li>
                        <li>• Gestion de projets agiles</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Point central avec année */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2022-2024</span>
                  </div>
                  
                  {/* Formation à droite */}
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-lg border border-indigo-200 dark:border-indigo-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                          Formation Développeur Web
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                          2022
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-indigo-600 mb-2">OpenClassrooms - Formation en ligne</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Formation complète en développement web</li>
                        <li>• HTML, CSS, JavaScript</li>
                        <li>• React, Node.js</li>
                        <li>• Bases de données</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2022 */}
                <div className="relative flex items-center">
                  {/* Expérience à gauche */}
                  <div className="w-5/12 pr-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-lg border border-green-200 dark:border-green-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          Stagiaire Référent Digital
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          2022
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-green-600 mb-2">Groupe Scolaire N-D de la Renaissance - Somain (59)</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Création du site Web</li>
                        <li>• Création d&apos;affiches pour Rollup</li>
                        <li>• Maintenance informatique</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Point central avec année */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2022</span>
                  </div>
                  
                  {/* Formation à droite */}
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-teal-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                          Certifications
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                          2022
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-teal-600 mb-2">Divers - En ligne</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Certification Google Marketing Digital</li>
                        <li>• Certification Cybersécurité OpenClassrooms</li>
                        <li>• Certification SEO</li>
                        <li>• Certification UX/UI</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2020-2021 */}
                <div className="relative flex items-center">
                  {/* Expérience à gauche */}
                  <div className="w-5/12 pr-8">
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                          Expériences en Logistique
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                          2020-2021
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-600 mb-2">Diverses entreprises - Nord (59)</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Chauffeur Livreur - Pizza Crousty</li>
                        <li>• Cariste d&apos;entrepôt - Logisima</li>
                        <li>• Magasinier Cariste - Conforama</li>
                        <li>• Agent Logistique - Kiabi Logistique</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Point central avec année */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2020-2021</span>
                  </div>
                  
                  {/* Espace vide à droite */}
                  <div className="w-5/12 pl-8"></div>
                </div>

                {/* 2016-2017 */}
                <div className="relative flex items-center">
                  {/* Expérience à gauche */}
                  <div className="w-5/12 pr-8">
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 shadow-lg border border-orange-200 dark:border-orange-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          Assistant de Manager
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                          2016-2017
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-orange-600 mb-2">Collège Sainte Anne - Service civique - Somain (59)</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Assistant Manager au Groupe Scolaire N-D de la Renaissance</li>
                        <li>• Gestion d&apos;équipe</li>
                        <li>• Communication</li>
                        <li>• Organisation administrative</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Point central avec année */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2016-2017</span>
                  </div>
                  
                  {/* Formation à droite */}
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 shadow-lg border border-amber-200 dark:border-amber-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                          Formation Management
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                          2016
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-amber-600 mb-2">Service Civique - Somain (59)</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Formation en gestion d&apos;équipe</li>
                        <li>• Communication</li>
                        <li>• Organisation administrative</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2012 */}
                <div className="relative flex items-center">
                  {/* Expérience à gauche */}
                  <div className="w-5/12 pr-8">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Stage Assistant Manager
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          2012
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-purple-600 mb-2">Société M-Animation - Douai (59)</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Stage Assistant Manager à l&apos;Usine Renault - Cuincy
                      </p>
                    </div>
                  </div>
                  
                  {/* Point central avec année */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2012</span>
                  </div>
                  
                  {/* Espace vide à droite */}
                  <div className="w-5/12 pl-8"></div>
                </div>

                {/* 2008 */}
                <div className="relative flex items-center">
                  {/* Expérience à gauche */}
                  <div className="w-5/12 pr-8">
                    <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 shadow-lg border border-red-200 dark:border-red-800 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                          Stage Technicien de Maintenance Informatique
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          2008
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-red-600 mb-2">CC Cœur d&apos;Ostrevent - Lewarde</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Stage en maintenance informatique.
                      </p>
                    </div>
                  </div>
                  
                  {/* Point central avec année */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-rose-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2008</span>
                  </div>
                  
                  {/* Espace vide à droite */}
                  <div className="w-5/12 pl-8"></div>
                </div>
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
                          className="text-xs px-2 py-1 rounded" 
                          style={{ 
                            backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', 
                            color: darkMode ? '#fff' : 'var(--light-text)' 
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