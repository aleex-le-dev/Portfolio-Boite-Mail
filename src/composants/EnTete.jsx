import React, { useRef, useEffect, useState } from 'react';
import SearchBar from "./ux/SearchBar";
import { FiSettings } from "react-icons/fi";
import { MdMenu, MdInbox, MdSend, MdArchive, MdSchedule, MdDelete, MdFolder, MdLabelImportant, MdEdit } from "react-icons/md";
import { LABELS, USERNAME, USER_EMAIL, USER_AVATAR } from "./constantes";

export default function EnTete({
  onToggleSidebar,
  search,
  onSearchChange,
  searchResults,
  onSelectMail,
  onSelectCategory
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
    <header className="w-full flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 bg-white">
      {/* Groupe menu + titre */}
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <div className="flex items-center">
          <button className="flex items-center justify-center h-8 w-8 p-0 rounded-full hover:bg-gray-200 transition mt-1" onClick={onToggleSidebar} aria-label="Ouvrir/fermer la barre latérale">
            <MdMenu className="text-2xl text-gray-700" />
          </button>
          <div className="hidden md:block font-bold text-lg md:text-2xl text-gray-900 ml-1">salutalex.fr</div>
        </div>
        
        {/* Barre de recherche mobile - centrée */}
        <div className="md:hidden flex-1 mx-4">
          <SearchBar
            placeholder="Rechercher..."
            value={search}
            onChange={onSearchChange}
          />
        </div>
        
        {/* Boutons de droite - visibles sur mobile */}
        <div className="flex md:hidden items-center ">
          <button 
            className="p-2 rounded-full hover:bg-gray-200 transition-transform duration-500" 
            aria-label="Paramètres"
            onClick={(e) => {
              const button = e.currentTarget;
              if (button) {
                const currentRotation = button.style.transform;
                const currentDegrees = currentRotation ? parseInt(currentRotation.match(/rotate\((\d+)deg\)/)?.[1] || '0') : 0;
                const newDegrees = currentDegrees + 180;
                button.style.transform = `rotate(${newDegrees}deg)`;
              }
            }}
          >
            <FiSettings className="text-xl text-gray-700" />
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
            />
          </div>
          
          {search && search.length >= 3 && (
            <>
              <div className="fixed inset-0 bg-black/70 z-40" onClick={() => onSearchChange({ target: { value: '' } })}></div>
              <div ref={resultsRef} className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-y-auto w-[90vw] md:w-[800px] px-2 max-h-[80vh]">
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
                          <div className="font-bold text-sm text-gray-700 px-2 pt-2 pb-1">Libellés</div>
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
                                    className="flex items-center gap-2 px-4 py-2 border-b last:border-b-0 w-full hover:bg-blue-50 transition text-left"
                                    type="button"
                                    onClick={() => {
                                      if (typeof onSelectCategory === 'function') onSelectCategory(sub);
                                      else if (typeof onSelectMail === 'function') onSelectMail({ category: sub });
                                    }}
                                  >
                                    {getCategoryIcon(sub)}
                                    <span className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlight(sub) }} />
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
                        <div className="font-bold text-sm text-gray-700 px-2 pt-2 pb-1">Emails</div>
                        {searchResults.map((mail, index) => {
                          const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                          const highlight = (txt) => txt ? txt.replace(regex, '<b>$1</b>') : '';
                          
                          return (
                            <button
                              key={mail.id + '-' + index}
                              className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 w-full hover:bg-blue-50 transition text-left"
                              type="button"
                              onClick={() => onSelectMail(mail)}
                            >
                              <img src={mail.senderAvatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt={mail.sender} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: highlight(mail.sender) }} />
                                  <span className="text-xs text-gray-500">{mail.date}</span>
                                </div>
                                <div className="text-sm text-gray-700 font-medium mb-1" dangerouslySetInnerHTML={{ __html: highlight(mail.title) }} />
                                <div className="text-xs text-gray-500 truncate" dangerouslySetInnerHTML={{ __html: highlight(Array.isArray(mail.content) ? mail.content[0] : mail.content) }} />
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
          className="p-2 rounded-full hover:bg-gray-200 transition-transform duration-500" 
          aria-label="Paramètres"
          onClick={(e) => {
            const button = e.currentTarget;
            if (button) {
              const currentRotation = button.style.transform;
              const currentDegrees = currentRotation ? parseInt(currentRotation.match(/rotate\((\d+)deg\)/)?.[1] || '0') : 0;
              const newDegrees = currentDegrees + 180;
              button.style.transform = `rotate(${newDegrees}deg)`;
            }
          }}
        >
          <FiSettings className="text-2xl text-gray-700" />
        </button>
        
        <button
          className="flex items-center gap-2 p-2 transition"
          aria-label="Profil utilisateur"
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
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
              Paramètres
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}; 