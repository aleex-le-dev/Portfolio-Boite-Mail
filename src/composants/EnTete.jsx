import React, { useRef, useEffect, useState } from 'react';
import SearchBar from "./ux/SearchBar";
import { FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { MdMenu, MdInbox, MdSend, MdArchive, MdSchedule, MdDelete, MdFolder, MdLabelImportant, MdEdit } from "react-icons/md";
import { LABELS, USERNAME, USER_EMAIL, USER_AVATAR } from "./constantes";

export default function EnTete({
  onToggleSidebar,
  search,
  onSearchChange,
  searchResults,
  onSelectMail,
  onSelectCategory,
  darkMode,
  onToggleDarkMode,
  sidebarOpen
}) {
  // Fonction pour obtenir l'icône de catégorie
  const getCategoryIcon = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'boîte de réception': return <MdInbox className="text-blue-500 text-lg" />;
      case 'messages envoyés': return <MdSend className="text-green-500 text-lg" />;
      case 'archive': return <MdArchive className="text-gray-500 text-lg" />;
      case 'brouillons': return <MdSchedule className="text-purple-500 text-lg" />;
      case 'corbeille': return <MdDelete className="text-red-500 text-lg" />;
      default: return <MdFolder className="text-gray-400 text-lg" />;
    }
  };
  // Fonction utilitaire pour trier les sous-libellés
  const sortAlpha = arr => [...arr].sort((a, b) => a.localeCompare(b, 'fr'));
  // Détection d'absence totale de résultats (ni mail ni libellé)
  const searchNorm = search ? search.toLowerCase().replace(/\s+/g, '') : '';
  const hasLabel = LABELS.some(l => l.label.toLowerCase().replace(/\s+/g, '').includes(searchNorm) || l.subs.some(sub => sub.toLowerCase().replace(/\s+/g, '').includes(searchNorm)));
  const noResult = search && !searchResults.length && !hasLabel;

  const searchRef = React.useRef();
  const resultsRef = React.useRef();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const userMenuMobileRef = useRef(null);
  const user = {
    email: USER_EMAIL,
    name: USERNAME,
    avatar: USER_AVATAR
  };

  const handleDeconnexion = () => {
    // Relancer l'intro en redirigeant vers la page d'accueil
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        onSearchChange({ target: { value: '' } });
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onSearchChange]);

  useEffect(() => {
    if (!showUserMenu) return;
    function handleClickOutside(event) {
      if ((userMenuRef.current && !userMenuRef.current.contains(event.target)) &&
          (userMenuMobileRef.current && !userMenuMobileRef.current.contains(event.target))) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);



  return (
    <header className={`w-full flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 ${darkMode ? 'text-white' : 'bg-white text-black'}`} style={darkMode ? { backgroundColor: 'var(--dark-primary-bg)' } : { backgroundColor: 'var(--light-primary-bg)' }}>
      {/* Groupe menu + titre */}
      <div className="flex items-center justify-between mb-0 md:mb-0">
        <div className="flex items-center">
          <button 
            className={`flex items-center justify-center h-8 w-8 p-0 rounded-full transition mt-1 ${darkMode ? '' : 'hover:bg-gray-200'}`} 
            style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }}
            onClick={onToggleSidebar} 
            aria-label={sidebarOpen ? "Réduire la barre latérale" : "Étendre la barre latérale"}
            title={sidebarOpen ? "Réduire la barre latérale" : "Étendre la barre latérale"}
          >
            <MdMenu className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
          <div className={`hidden md:block font-bold text-lg md:text-2xl ml-1 whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'}`}>Alexandre Janacek</div>
        </div>
        
        {/* Barre de recherche mobile - centrée par rapport à l'écran */}
        <div className="md:hidden flex-1 mx-4 flex justify-center">
          <div className={`relative rounded-full border shadow-sm w-full max-w-md ${darkMode ? '' : 'bg-white'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'var(--light-border)' }}>
            <SearchBar
              placeholder="Rechercher ..."
              value={search}
              onChange={onSearchChange}
              darkMode={darkMode}
            />
            
                        {search && search.length >= 3 && (
              <>
                <div className="fixed inset-0 z-40 pointer-events-none" style={{ backgroundColor: 'var(--dark-primary-bg)', opacity: 0.7 }}></div>
                <div 
                  className={`absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[calc(100vh-120px)] ${darkMode ? '' : 'bg-white border-gray-200'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : {}}
                >
                  {searchResults.length === 0 ? (
                    <div className="w-full text-center py-8 text-gray-400 text-base">Aucun résultat</div>
                  ) : (
                    <>
                      {/* Catégorie Libellés */}
                      {(() => {
                        const matchingLabels = LABELS.filter(l => {
                          const matchParent = l.label.toLowerCase().replace(/\s+/g, '').includes(searchNorm);
                          const matchChild = l.subs.some(sub => sub.toLowerCase().replace(/\s+/g, '').includes(searchNorm));
                          return matchParent || matchChild;
                        });
                        if (matchingLabels.length === 0) return null;
                        return (
                          <div className="mb-2">
                            <div className={`font-bold text-sm px-2 pt-2 pb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Libellés</div>
                            {matchingLabels.flatMap(({ label, subs }) => {
                              if (
                                label.toLowerCase().replace(/\s+/g, '').includes(searchNorm) ||
                                subs.some(sub => sub.toLowerCase().replace(/\s+/g, '').includes(searchNorm))
                              ) {
                                return sortAlpha(subs).map(sub => {
                                  const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                                  const highlight = (txt) => txt ? txt.replace(regex, '<mark style="background-color: #fef08a; padding: 0 1px; border-radius: 2px;">$1</mark>') : '';
                                  return (
                                    <div
                                      key={label + '-' + sub}
                                      className={`flex items-center gap-2 px-4 py-2 border-b last:border-b-0 w-full transition text-left cursor-pointer ${darkMode ? '' : 'hover:bg-blue-50'}`}
                                      style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'var(--light-border)' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectCategory(sub);
                                        onSearchChange({ target: { value: '' } });
                                      }}
                                      onTouchStart={(e) => {
                                        e.stopPropagation();
                                        onSelectCategory(sub);
                                        onSearchChange({ target: { value: '' } });
                                      }}
                                    >
                                      {getCategoryIcon(sub)}
                                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: highlight(sub) }} />
                                    </div>
                                  );
                                });
                              }
                              return [];
                            })}
                          </div>
                        );
                      })()}
                      
                      {/* Résultats des emails */}
                      {searchResults.length > 0 && (
                        <div>
                          <div className={`font-bold text-sm px-2 pt-2 pb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emails</div>
                          {searchResults.map((mail, index) => {
                            const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                            const highlight = (txt) => txt ? txt.replace(regex, '<b>$1</b>') : '';
                            
                            return (
                              <div
                                key={mail.id + '-' + index}
                                className={`flex items-start gap-3 px-4 py-3 border-b last:border-b-0 w-full transition text-left cursor-pointer ${darkMode ? '' : 'hover:bg-blue-50'}`}
                                style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'var(--light-border)' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectMail(mail);
                                  onSearchChange({ target: { value: '' } });
                                }}
                                onTouchStart={(e) => {
                                  e.stopPropagation();
                                  onSelectMail(mail);
                                  onSearchChange({ target: { value: '' } });
                                }}
                              >
                                <img src={mail.senderAvatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt={mail.sender} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-black'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.sender) }} />
                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{mail.date}</span>
                                  </div>
                                  <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.title) }} />
                                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`} dangerouslySetInnerHTML={{ __html: highlight(Array.isArray(mail.content) ? mail.content[0] : mail.content) }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Boutons de droite - visibles sur mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            className="p-3 rounded-full hover:bg-gray-200 transition" 
            aria-label="Mode sombre"
            onClick={onToggleDarkMode}
          >
            {darkMode ? (
              <FiSun className="text-2xl md:text-xl text-yellow-400" />
            ) : (
              <FiMoon className="text-2xl md:text-xl text-gray-700" />
            )}
          </button>
          
          <button
            className="p-3 rounded-full hover:bg-gray-200 transition"
            aria-label="Profil utilisateur"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src={user.avatar} alt={user.name} className="w-10 h-10 md:w-8 md:h-8 rounded-full object-cover" />
          </button>
          
          {showUserMenu && (
            <div
              ref={userMenuMobileRef}
              className="absolute right-0 top-full mt-2 max-w-xl rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_15px_15px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 z-50"
              style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}` }}
            >
              <div className="px-4 py-4 border-b" style={{ borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)', background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)' }}>
                <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Connecté en tant que
                </p>
                <div className="flex items-center mt-1">
                  <div className="w-8 h-8 rounded-full mr-2 flex-shrink-0 overflow-hidden">
                    <img 
                      src={USER_AVATAR} 
                      alt="Alexandre Janacek" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <a 
                    href={`mailto:${USER_EMAIL}`}
                    className="text-sm font-medium hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300 flex-1 min-w-0 cursor-pointer"
                    style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                  >
                    {USER_EMAIL}
                  </a>
                </div>
              </div>

              <div className="py-1.5">
                <a
                  href={`mailto:${USER_EMAIL}`}
                  className="group relative flex items-center px-4 py-2.5 text-sm transition-all duration-200"
                  style={{ color: darkMode ? 'var(--dark-text-color)' : 'var(--light-text-color)', '--tw-hover-bg-opacity': '0.1' }}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                  <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">Paramètres</span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>

                <button
                  onClick={handleDeconnexion}
                  className="group relative flex items-center w-full px-4 py-2.5 text-sm transition-all duration-200"
                  style={{ color: darkMode ? 'var(--dark-text-color)' : 'var(--light-text-color)', '--tw-hover-bg-opacity': '0.1' }}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 text-red-500 group-hover:text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-red-600">Déconnexion</span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Zone de recherche - visible uniquement sur desktop */}
      <div className="hidden md:flex flex-row items-center justify-center gap-4 w-full">
        {/* Barre de recherche - centrée */}
        <div className="relative w-full max-w-xl z-50 flex justify-center">
          <div ref={searchRef} className="w-full">
          <SearchBar
              placeholder="Rechercher une information..."
            value={search}
            onChange={onSearchChange}
            darkMode={darkMode}
          />
        </div>
          
        {search && search.length >= 3 && (
            <>
              <div className="fixed inset-0 z-40" style={{ backgroundColor: 'var(--dark-primary-bg)', opacity: 0.7 }} onClick={() => onSearchChange({ target: { value: '' } })}></div>
              <div ref={resultsRef} className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 border rounded-xl shadow-lg z-50 overflow-y-auto w-[90vw] md:w-[800px] px-2 max-h-[80vh] ${darkMode ? '' : 'bg-white border-gray-200'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : {}}>
            {noResult ? (
              <div className="w-full text-center py-8 text-gray-400 text-base">Aucun résultat</div>
            ) : (
              <>
                {/* Catégorie Libellés */}
                {(() => {
                  const matchingLabels = LABELS.filter(l => {
                    const matchParent = l.label.toLowerCase().replace(/\s+/g, '').includes(searchNorm);
                    const matchChild = l.subs.some(sub => sub.toLowerCase().replace(/\s+/g, '').includes(searchNorm));
                    return matchParent || matchChild;
                  });
                  if (matchingLabels.length === 0) return null;
                  return (
                    <div className="mb-2">
                      <div className={`font-bold text-sm px-2 pt-2 pb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Libellés</div>
                      {matchingLabels.flatMap(({ label, subs }) => {
                        if (
                          label.toLowerCase().replace(/\s+/g, '').includes(searchNorm) ||
                          subs.some(sub => sub.toLowerCase().replace(/\s+/g, '').includes(searchNorm))
                        ) {
                              return sortAlpha(subs).map(sub => {
                                const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                                const highlight = (txt) => txt ? txt.replace(regex, '<mark style="background-color: #fef08a; padding: 0 1px; border-radius: 2px;">$1</mark>') : '';
                                return (
                            <button
                              key={label + '-' + sub}
                              className={`flex items-center gap-2 px-4 py-2 border-b last:border-b-0 w-full transition text-left cursor-pointer ${darkMode ? '' : 'hover:bg-blue-50'}`}
                              style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'var(--light-border)' }}
                              type="button"
                              aria-label={`Sélectionner ${sub}`}
                              onClick={() => {
                                if (typeof onSelectCategory === 'function') onSelectCategory(sub);
                                else if (typeof onSelectMail === 'function') onSelectMail({ category: sub });
                              }}
                            >
                                    {getCategoryIcon(sub)}
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: highlight(sub) }} />
                            </button>
                                );
                              });
                            }
                            return [];
                      })}
                    </div>
                  );
                })()}
                    
                    {/* Résultats des emails */}
                {searchResults.length > 0 && (
                      <div>
                    <div className={`font-bold text-sm px-2 pt-2 pb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emails</div>
                        {searchResults.map((mail, index) => {
                          const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                          const highlight = (txt) => {
                            if (!txt) return '';
                            // Utiliser une approche plus robuste pour le surlignage
                            const parts = txt.split(regex);
                            return parts.map((part, index) => {
                              if (index % 2 === 1) {
                                // C'est la partie qui correspond à la recherche
                                return `<mark style="background-color: #fef08a; padding: 0 1px; border-radius: 2px;">${part}</mark>`;
                              }
                              return part;
                            }).join('');
                          };
                          
                          // Fonction pour extraire le contexte autour du mot recherché
                          const getContext = (content) => {
                            if (!content) return '';
                            const text = Array.isArray(content) ? content.join(' ') : content;
                            const match = text.match(regex);
                            if (!match) return '';
                            
                            const matchIndex = text.toLowerCase().indexOf(search.toLowerCase());
                            if (matchIndex === -1) return '';
                            
                            const start = Math.max(0, matchIndex - 50);
                            const end = Math.min(text.length, matchIndex + search.length + 50);
                            let context = text.substring(start, end);
                            
                            if (start > 0) context = '...' + context;
                            if (end < text.length) context = context + '...';
                            
                            return context;
                          };
                          
                          const context = getContext(mail.content);
                          
                      return (
                        <button
                              key={mail.id + '-' + index}
                              className={`flex items-start gap-3 px-4 py-3 border-b last:border-b-0 w-full transition text-left cursor-pointer ${darkMode ? '' : 'hover:bg-blue-50'}`}
                              style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'var(--light-border)' }}
                              type="button"
                              aria-label={`Sélectionner l'email de ${mail.sender} : ${mail.title}`}
                          onClick={() => onSelectMail(mail)}
                        >
                              <img src={mail.senderAvatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt={mail.sender} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-black'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.sender) }} />
                                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{mail.date}</span>
                                </div>
                                {mail.email && (
                                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`} dangerouslySetInnerHTML={{ __html: highlight(mail.email) }} />
                                )}
                                <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.title) }} />
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`} dangerouslySetInnerHTML={{ __html: context ? highlight(context) : highlight(Array.isArray(mail.content) ? mail.content[0] : mail.content) }} />
                              </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
            </>
        )}
        </div>
      </div>
      
      {/* Boutons de droite - cachés sur mobile */}
      <div className="hidden md:flex items-center relative">
        <button 
          className="p-3 rounded-full hover:bg-gray-200 transition" 
          aria-label="Mode sombre"
          title="Mode sombre"
          onClick={onToggleDarkMode}
        >
          {darkMode ? (
            <FiSun className="text-2xl text-yellow-400" />
          ) : (
            <FiMoon className="text-2xl text-gray-700" />
          )}
        </button>
        
        <button
          className="flex items-center gap-3 p-3 transition"
          aria-label="Profil utilisateur"
          title="Profil utilisateur"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden transition-transform hover:scale-110">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover"
              style={{ borderRadius: '50%' }}
            />
          </div>
        </button>
        
        {showUserMenu && (
          <div
            ref={userMenuRef}
            className="absolute right-0 top-full mt-2 max-w-xl rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_15px_15px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 z-50"
            style={{ backgroundColor: darkMode ? 'var(--dark-secondary-bg)' : 'var(--light-secondary-bg)', border: `1px solid ${darkMode ? 'var(--dark-border)' : 'var(--light-border)'}` }}
          >
            <div className="px-4 py-4 border-b" style={{ borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)', background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)' }}>
              <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">
                Connecté en tant que
              </p>
              <div className="flex items-center mt-1">
                <div className="w-8 h-8 rounded-full mr-2 flex-shrink-0 overflow-hidden">
                  <img 
                    src={USER_AVATAR} 
                    alt="Alexandre Janacek" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <a 
                  href={`mailto:${USER_EMAIL}`}
                  className="text-sm font-medium hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300 flex-1 min-w-0 cursor-pointer"
                  style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                >
                  {USER_EMAIL}
                </a>
              </div>
            </div>

            <div className="py-1.5">
                              <a
                  href={`mailto:${USER_EMAIL}`}
                  className="group relative flex items-center px-4 py-2.5 text-sm transition-all duration-200"
                  style={{ color: darkMode ? 'var(--dark-text-color)' : 'var(--light-text-color)', '--tw-hover-bg-opacity': '0.1' }}
                >
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">A propos de moi</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>

              <button
                onClick={handleDeconnexion}
                className="group relative flex items-center w-full px-4 py-2.5 text-sm transition-all duration-200"
                style={{ color: darkMode ? 'var(--dark-text-color)' : 'var(--light-text-color)', '--tw-hover-bg-opacity': '0.1' }}
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-red-500 group-hover:text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-red-600">Déconnexion</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}