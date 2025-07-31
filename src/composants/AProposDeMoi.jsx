import React from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR, USER_EMAIL } from './constantes';

export default function AProposDeMoi({ darkMode }) {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen transition-colors duration-300" 
      style={{ 
        backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-primary-bg)',
        color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
      }}
    >
      {/* Bouton de retour */}
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-lg"
          style={{ 
            backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
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
        className="relative shadow-lg"
        style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
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
              <p className="text-xl mb-4 text-blue-600">
                Concepteur Développeur d'Applications
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href={`mailto:${USER_EMAIL}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {USER_EMAIL}
                </a>
                <a 
                  href="https://linkedin.com/in/alexandre-janacek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973 0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355-.537 0-.856.371-.997.728-.052.127-.065.307-.065.486v3.607H9.351V7.723h1.944v1.521c.426-.623 1.266-1.521 2.658-1.521 1.601 0 2.801 1.086 2.801 3.42v3.836z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/aleex-le-dev\"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-8">
            {/* À propos */}
            <section 
              className="rounded-xl p-6 shadow-lg"
              style={{ 
                backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
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
                  Passionné par le développement web et les nouvelles technologies, je suis un concepteur développeur d'applications 
                  avec une expertise particulière dans les frameworks modernes comme React, Vue.js et Node.js.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Mon approche combine créativité technique et rigueur méthodologique pour créer des solutions innovantes 
                  et performantes. Je m'efforce constamment d'améliorer mes compétences et de rester à jour avec 
                  les dernières tendances du développement web.
                </p>
                <p className="text-lg leading-relaxed">
                  En dehors du code, j'apprécie les voyages et la découverte de nouvelles cultures, 
                  ce qui enrichit ma perspective créative dans mes projets de développement.
                </p>
              </div>
            </section>

            {/* Timeline Expérience et Formation */}
            <section 
              className="rounded-xl p-6 shadow-lg"
              style={{ 
                backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
              }}
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                Parcours Professionnel
              </h2>
              
              <div className="relative">
                {/* Timeline centrale */}
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
                        <p className="text-gray-700 dark:text-gray-300">
                          Création de nouvelles fonctionnalités en PHP/JS/MySQL. Utilisation de Wordpress avec Git.
                        </p>
                      </div>
                    </div>
                    
                    {/* Point central avec année */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">2024</span>
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
                        <p className="text-lg font-semibold text-indigo-600 mb-2">OpenClassrooms</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Formation complète en développement web avec HTML, CSS, JavaScript, React, Node.js.
                        </p>
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
                        <p className="text-lg font-semibold text-green-600 mb-2">Groupe Scolaire N-D de la Renaissance</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Création du site Web, création d'affiches pour Rollup, maintenance informatique.
                        </p>
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
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-teal-600">• Certification Google Marketing Digital</p>
                          <p className="text-sm font-medium text-teal-600">• Certification Cybersécurité</p>
                          <p className="text-sm font-medium text-teal-600">• Certification SEO & UX/UI</p>
                        </div>
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
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-600">• Chauffeur Livreur - Pizza Crousty</p>
                          <p className="text-sm font-medium text-gray-600">• Cariste d'entrepôt - Logisima</p>
                          <p className="text-sm font-medium text-gray-600">• Magasinier Cariste - Conforama</p>
                          <p className="text-sm font-medium text-gray-600">• Agent Logistique - Kiabi</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Point central avec année */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">2021</span>
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
                        <p className="text-lg font-semibold text-orange-600 mb-2">Collège Sainte Anne - Service civique</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Assistant Manager au Groupe Scolaire N-D de la Renaissance - Somain (59).
                        </p>
                      </div>
                    </div>
                    
                    {/* Point central avec année */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">2017</span>
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
                        <p className="text-lg font-semibold text-amber-600 mb-2">Service Civique</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Formation en gestion d'équipe, communication et organisation administrative.
                        </p>
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
                        <p className="text-lg font-semibold text-purple-600 mb-2">Société M-Animation - Douai</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Stage Assistant Manager à l'Usine Renault - Cuincy (59).
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
                        <p className="text-lg font-semibold text-red-600 mb-2">CC Cœur d'Ostrevent - Lewarde</p>
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
                border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
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
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)'
                  }}
                >
                  <h3 className="font-semibold mb-2">Portfolio Personnel</h3>
                  <p className="text-sm mb-3" style={{ color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
                    Portfolio moderne avec React et Tailwind CSS, incluant un système de thème clair/sombre.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>React</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>Tailwind</span>
                  </div>
                </div>
                
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)'
                  }}
                >
                  <h3 className="font-semibold mb-2">Application E-commerce</h3>
                  <p className="text-sm mb-3" style={{ color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
                    Plateforme de vente en ligne complète avec gestion des stocks et paiements.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>Vue.js</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>Node.js</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
                         {/* Compétences */}
             <section 
               className="rounded-xl p-6 shadow-lg"
               style={{ 
                 backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                 border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
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
                        alt="Adobe" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-xs font-medium">Adobe</span>
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
                border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                Langues
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Français</span>
                  <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>Natif</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Anglais</span>
                  <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>Courant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Espagnol</span>
                  <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>Intermédiaire</span>
                </div>
              </div>
            </section>

            {/* Contact rapide */}
            <section 
              className="rounded-xl p-6 shadow-lg"
              style={{ 
                backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)',
                border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                Contact Rapide
              </h2>
              <div className="space-y-3">
                <a 
                  href={`mailto:${USER_EMAIL}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="text-sm">Envoyer un email</span>
                </a>
                
                <a 
                  href="/src/assets/CV Alexandre_Janacek_Concepteur_Développeur.png"
                  download="CV_Alexandre_Janacek_Concepteur_Developpeur.png"
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: darkMode ? 'var(--dark-primary-bg)' : 'var(--light-secondary-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}`
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Télécharger CV</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 