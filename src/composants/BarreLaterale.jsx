import React, { useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { MdExpandMore, MdEdit } from 'react-icons/md';
import { LABELS, NAV_CATEGORIES } from './constantes.js';
import SearchBar from './ux/SearchBar.jsx';

const BarreLaterale = ({ selectedCategory, setSelectedCategory, emails, onDeleteSubLabel, filteredEmails, search, onSearchChange, searchResults, onSelectMail }) => {
  const [open, setOpen] = useState({
    labels: Object.fromEntries(LABELS.map(l => [l.label, false])),
    work: false
  });

  const closeAllDropdowns = () => {
    setOpen({
      labels: Object.fromEntries(LABELS.map(l => [l.label, false])),
      work: false
    });
  };

  return (
    <aside className="w-auto min-w-fit whitespace-nowrap bg-white text-gray-900 h-full flex flex-col py-4 px-2 overflow-y-auto md:min-w-[240px]">
      {/* Barre de recherche et bouton nouveau message - visibles uniquement sur mobile */}
      <div className="md:hidden space-y-3 mb-4">
        {/* Barre de recherche */}
        <div className="px-2">
          <SearchBar
            placeholder="Rechercher..."
            value={search}
            onChange={onSearchChange}
          />
        </div>
        
        {/* Bouton Nouveau message */}
        <div className="px-2">
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 text-sm">
            <MdEdit className="text-lg" />
            Nouveau message
          </button>
        </div>
      </div>

      {/* Section navigation principale */}
      <ul className="space-y-0 mb-2">
        {NAV_CATEGORIES.map(({ label, value, icon: Icon }) => (
          <li key={value}>
            <button
              className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-sm md:text-base focus:outline-none ${selectedCategory === value ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
              onClick={() => { setSelectedCategory(value); closeAllDropdowns(); }}
            >
              {Icon && <Icon className="text-xl md:text-2xl" />}
              <span className={`text-left ${selectedCategory === value ? 'font-bold' : ''}`}>
                {label}
              </span>
              {value === 'Boîte de réception' && (
                <span className="ml-auto bg-blue-100 rounded-full px-2 text-blue-700 text-xs font-semibold">
                  {(emails || []).filter(mail => mail.category === 'Boîte de réception').length}
                </span>
              )}
              {value === 'Important' && (
                <span className="ml-auto bg-orange-100 rounded-full px-2 text-orange-700 text-xs font-semibold">
                  {(emails || []).filter(mail => mail.category === 'Important').length}
                </span>
              )}
              {value === 'Messages envoyés' && (
                <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-700 text-xs font-semibold">
                  {JSON.parse(localStorage.getItem('messageenvoye') || '[]').length}
                </span>
              )}
              {value === 'Corbeille' && (
                <span className="ml-auto bg-red-100 rounded-full px-2 text-red-700 text-xs font-semibold">
                  {(emails || []).filter(mail => mail.category === 'Corbeille').length}
                </span>
              )}
              {value === 'Archive' && (
                <span className="ml-auto bg-yellow-100 rounded-full px-2 text-yellow-700 text-xs font-semibold">
                  {(emails || []).filter(mail => mail.category === 'Archive').length}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {/* Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="uppercase font-bold tracking-wider text-sm md:text-base">Libellés</span>
        </div>
        <ul className="space-y-0.5">
          {LABELS.map(({ label, subs }) => (
            <li key={label}>
              <button className={`flex items-center w-full gap-2 px-3 py-1 text-sm md:text-base rounded-lg ${selectedCategory === label ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-900'}`}
                onClick={() => {
                  if (label === 'Mes certifications') {
                    setSelectedCategory(label);
                    closeAllDropdowns();
                  } else {
                    setOpen(o => ({
                      ...o,
                      labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, l === label ? !o.labels[l] : false])),
                      work: false
                    }));
                  }
                }}
              >
                <FcFolder className="text-lg md:text-xl" />
                <span className="uppercase">
                  {label}
                </span>
                <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">
                  {(emails || []).filter(mail => mail.category === label).length}
                </span>
                {subs.length > 0 && (
                  <MdExpandMore className={`text-lg transition-transform ${open.labels[label] ? 'rotate-180' : ''}`} />
                )}
              </button>
              {subs.length > 0 && open.labels[label] && (
                <ul className="ml-6 mt-1 space-y-0.5">
                  {subs.map(sub => (
                    <li key={sub}>
                      <button
                        className={`flex items-center w-full gap-2 px-3 py-1 text-sm rounded-lg ${selectedCategory === sub ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-900'}`}
                        onClick={() => { setSelectedCategory(sub); closeAllDropdowns(); }}
                      >
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span className="text-left">
                          {sub}
                        </span>
                        <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{(emails || []).filter(mail => mail.category === sub).length}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BarreLaterale; 