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
                                  const highlight = (txt) => txt ? txt.replace(regex, '<b>$1</b>') : '';
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
              className="absolute right-0 top-full mt-2 max-w-sm w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_15px_15px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 z-50"
            >
              <div className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-600">
                <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Connecté en tant que
                </p>
                <div className="flex items-center mt-1">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white truncate hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300">
                    alexandre.janacek@example.com
                  </p>
                </div>
              </div>

              <div className="py-1.5">
                <a
                  href="#"
                  className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">Profil</span>
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

                <a
                  href="#"
                  className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
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
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
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
                  className="group relative flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
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
                                const highlight = (txt) => txt ? txt.replace(regex, '<b>$1</b>') : '';
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
                      const highlight = (txt) => txt ? txt.replace(regex, '<b>$1</b>') : '';
                          
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
                                <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.title) }} />
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`} dangerouslySetInnerHTML={{ __html: highlight(Array.isArray(mail.content) ? mail.content[0] : mail.content) }} />
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
            className="absolute right-0 top-full mt-2 max-w-sm w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_15px_15px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 z-50"
          >
            <div className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-600">
              <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">
                Connecté en tant que
              </p>
              <div className="flex items-center mt-1">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p className="text-sm font-medium text-white truncate hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300">
                  alexandre.janacek@example.com
                </p>
              </div>
            </div>

            <div className="py-1.5">
              <a
                href="#"
                className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">Profil</span>
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

              <a
                href="#"
                className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
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
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
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
                className="group relative flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
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