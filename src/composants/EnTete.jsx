import React, { useRef, useEffect, useState } from 'react';
import SearchBar from "./ux/SearchBar";
import { FiMoon, FiSun } from "react-icons/fi";
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
  const user = {
    email: USER_EMAIL,
    name: USERNAME,
    avatar: USER_AVATAR
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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);



  return (
    <header className={`w-full flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Groupe menu + titre */}
      <div className="flex items-center justify-between mb-0 md:mb-0">
      <div className="flex items-center">
        <button 
          className={`flex items-center justify-center h-8 w-8 p-0 rounded-full transition mt-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} 
          onClick={onToggleSidebar} 
          aria-label={sidebarOpen ? "Réduire la barre latérale" : "Étendre la barre latérale"}
          title={sidebarOpen ? "Réduire la barre latérale" : "Étendre la barre latérale"}
        >
          <MdMenu className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>
          <div className={`hidden md:block font-bold text-lg md:text-2xl ml-1 whitespace-nowrap ${darkMode ? 'text-white' : 'text-gray-900'} `}>Alexandre Janacek</div>
        </div>
        
        {/* Barre de recherche mobile - centrée par rapport à l'écran */}
        <div className="md:hidden flex-1 mx-4 flex justify-center">
          <div className={`relative rounded-full border shadow-sm w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
            <SearchBar
              placeholder="Rechercher..."
              value={search}
              onChange={onSearchChange}
              darkMode={darkMode}
            />
            
                        {search && search.length >= 3 && (
              <>
                <div className="fixed inset-0 bg-black/70 z-40 pointer-events-none"></div>
                <div 
                  className={`fixed left-1/2 top-20 -translate-x-1/2 border rounded-xl shadow-lg z-[9999] overflow-y-auto w-[90vw] max-h-[calc(100vh-120px)] ${darkMode ? 'bg-[#0a0a0a] border-gray-600' : 'bg-white border-gray-200'}`}
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
                                      className={`flex items-center gap-2 px-4 py-2 border-b last:border-b-0 w-full transition text-left cursor-pointer ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-blue-50 border-gray-200'}`}
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
                                className={`flex items-start gap-3 px-4 py-3 border-b last:border-b-0 w-full transition text-left cursor-pointer ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-blue-50 border-gray-200'}`}
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
                                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.sender) }} />
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
        <div className="flex md:hidden items-center ">
          <button 
            className="p-2 rounded-full hover:bg-gray-200 transition" 
            aria-label="Mode sombre"
            onClick={onToggleDarkMode}
          >
            {darkMode ? (
              <FiSun className="text-xl text-yellow-400" />
            ) : (
              <FiMoon className="text-xl text-gray-700" />
            )}
          </button>
          
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Profil utilisateur"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
          </button>
          
          {showUserMenu && (
            <div ref={userMenuRef} className="absolute right-4 top-16 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-[200px] z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
                Paramètres
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
                Déconnexion
              </button>
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
              placeholder="Rechercher..."
            value={search}
            onChange={onSearchChange}
            darkMode={darkMode}
          />
        </div>
          
        {search && search.length >= 3 && (
            <>
              <div className="fixed inset-0 bg-black/70 z-40" onClick={() => onSearchChange({ target: { value: '' } })}></div>
              <div ref={resultsRef} className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 border rounded-xl shadow-lg z-50 overflow-y-auto w-[90vw] md:w-[800px] px-2 max-h-[80vh] ${darkMode ? 'bg-[#0a0a0a] border-gray-600' : 'bg-white border-gray-200'}`}>
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
                              className={`flex items-center gap-2 px-4 py-2 border-b last:border-b-0 w-full transition text-left ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-blue-50 border-gray-200'}`}
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
                              className={`flex items-start gap-3 px-4 py-3 border-b last:border-b-0 w-full transition text-left ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-blue-50 border-gray-200'}`}
                              type="button"
                              aria-label={`Sélectionner l'email de ${mail.sender} : ${mail.title}`}
                          onClick={() => onSelectMail(mail)}
                        >
                              <img src={mail.senderAvatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt={mail.sender} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`} dangerouslySetInnerHTML={{ __html: highlight(mail.sender) }} />
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
      <div className="hidden md:flex items-center gap-4 relative">
        <button 
          className="p-2 rounded-full hover:bg-gray-200 transition" 
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
          className="flex items-center gap-2 p-2 transition"
          aria-label="Profil utilisateur"
          title="Profil utilisateur"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden transition-transform hover:scale-110">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover"
              style={{ borderRadius: '50%' }}
            />
          </div>
        </button>
        
        {showUserMenu && (
          <div ref={userMenuRef} className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-[200px] z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="font-semibold text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition" aria-label="Paramètres">
              Paramètres
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition" aria-label="Déconnexion">
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
};