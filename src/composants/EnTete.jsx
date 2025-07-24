import React from "react";
import SearchBar from "./ux/SearchBar";
import { FiSettings, FiUser } from "react-icons/fi";
import { MdMenu, MdInbox, MdSend, MdLabelImportant, MdArchive, MdSchedule, MdDelete, MdFolder } from "react-icons/md";

// Composant d'en-tête de la boîte mail (barre supérieure)
// Props : onToggleSidebar (fonction pour ouvrir/fermer la barre latérale)
const EnTete = ({ onToggleSidebar, search, onSearchChange, searchResults = [], onSelectMail }) => {
  // Fonction pour obtenir l'icône de catégorie
  const getCategoryIcon = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'boîte de réception': return <MdInbox className="text-blue-500 text-lg" />;
      case 'messages envoyés': return <MdSend className="text-green-500 text-lg" />;
      case 'important': return <MdLabelImportant className="text-yellow-500 text-lg" />;
      case 'archive': return <MdArchive className="text-gray-500 text-lg" />;
      case 'brouillons': return <MdSchedule className="text-purple-500 text-lg" />;
      case 'corbeille': return <MdDelete className="text-red-500 text-lg" />;
      default: return <MdFolder className="text-gray-400 text-lg" />;
    }
  };
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white">
      {/* Groupe menu + titre */}
      <div className="flex items-center">
        <button className="flex items-center justify-center h-8 w-8 p-0 rounded-full hover:bg-gray-200 transition mt-1" onClick={onToggleSidebar} aria-label="Ouvrir/fermer la barre latérale">
          <MdMenu className="text-2xl text-gray-700" />
        </button>
        <div className="font-bold text-2xl text-gray-900 ml-1">salutalex.fr</div>
      </div>
      {/* Barre de recherche */}
      <div className="relative w-96">
        <SearchBar placeholder="Rechercher dans les emails" value={search} onChange={onSearchChange} />
        {search && (searchResults.length > 0 || (searchResults.some(mail => (mail.labels || []).some(label => label.toLowerCase() === search.toLowerCase())))) && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50  overflow-y-auto w-[800px] px-2">
            {/* Catégorie Emails */}
            {searchResults.length > 0 && (
              <div className="mb-2">
                <div className="font-bold text-sm text-gray-700 px-2 pt-2 pb-1">Emails</div>
                {searchResults.map(mail => {
                  const regex = new RegExp(`(${search})`, 'gi');
                  const highlight = (txt) => txt ? txt.replace(regex, '<b>$1</b>') : '';
                  let contentPreview = '';
                  if (Array.isArray(mail.content)) {
                    const found = mail.content.find(c => regex.test(c));
                    if (found) contentPreview = highlight(found);
                  }
                  return (
                    <button
                      key={mail.id}
                      className="w-full flex items-start gap-3 text-left px-4 py-3 hover:bg-blue-50 transition border-b last:border-b-0 min-w-[320px]"
                      onClick={() => onSelectMail(mail)}
                    >
                      <span className="flex-shrink-0 mt-1 flex items-center gap-1 w-28">
                        <span>{getCategoryIcon(mail.category)}</span>
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border w-[120px] truncate">{mail.category || ''}</span>
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="font-semibold" dangerouslySetInnerHTML={{__html: highlight(mail.title)}} />
                        <span className="text-xs text-gray-500" dangerouslySetInnerHTML={{__html: `${highlight(mail.sender)} | ${highlight(mail.email)}`}} />
                        <span className="text-xs text-gray-700 mt-1" dangerouslySetInnerHTML={{__html: highlight(mail.category)}} />
                        {contentPreview && <span className="text-xs text-gray-700 mt-1" dangerouslySetInnerHTML={{__html: contentPreview}} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            {/* Catégorie Libellés */}
            {(() => {
              // On cherche les libellés qui CONTIENNENT la recherche (insensible à la casse)
              const matchingLabels = Array.from(new Set(
                searchResults.flatMap(mail => (mail.labels || []))
              )).filter(label => label.toLowerCase().includes(search.toLowerCase()));
              if (matchingLabels.length === 0) return null;
              return (
                <div className="mb-2">
                  <div className="font-bold text-sm text-gray-700 px-2 pt-2 pb-1">Libellés</div>
                  {matchingLabels.map(label => {
                    // Trouver le premier mail contenant ce libellé
                    const mailWithLabel = searchResults.find(mail => (mail.labels || []).includes(label));
                    return (
                      <button
                        key={label}
                        className="flex items-center gap-2 px-4 py-2 border-b last:border-b-0 w-full hover:bg-blue-50 transition text-left"
                        onClick={() => mailWithLabel && onSelectMail(mailWithLabel)}
                        type="button"
                      >
                        <MdLabelImportant className="text-yellow-500 text-lg" />
                        <span className="text-base font-bold text-gray-800">{label}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition" aria-label="Paramètres">
          <FiSettings className="text-2xl text-gray-700" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 transition" aria-label="Profil">
          <FiUser className="text-2xl text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default EnTete; 