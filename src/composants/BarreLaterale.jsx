import React, { useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { MdExpandMore, MdEdit, MdClose } from 'react-icons/md';
import { LABELS, NAV_CATEGORIES } from './constantes.js';
import SearchBar from './ux/SearchBar.jsx';
import { IoMailSharp } from 'react-icons/io5';

const BarreLaterale = ({ selectedCategory, setSelectedCategory, emails, onCloseSidebar, darkMode }) => {
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
    <aside className={`w-auto min-w-fit whitespace-nowrap h-full flex flex-col py-4 px-2 overflow-y-auto md:min-w-[240px] ${darkMode ? 'text-white' : 'bg-white text-gray-900'}`} style={darkMode ? { backgroundColor: 'var(--dark-primary-bg)' } : { backgroundColor: 'var(--light-primary-bg)' }}>
      {/* Bouton fermer - visible uniquement sur mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Alexandre Janacek</div>
        <button 
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={onCloseSidebar}
          aria-label="Fermer le menu"
        >
          <MdClose className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Bouton Me contacter - toujours visible au-dessus de la navigation */}
      <div className="w-full px-2 mb-4">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 text-sm">
          <IoMailSharp className="text-lg" />
          Me contacter
        </button>
      </div>

      {/* Section navigation principale */}
      <ul className="space-y-0 mb-2">
        {NAV_CATEGORIES.map(({ label, value, icon: Icon }) => (
          <li key={value}>
            <button
              className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-sm md:text-base focus:outline-none ${selectedCategory === value ? (darkMode ? 'bg-blue-900 text-white' : 'bg-blue-50 text-blue-700') : (darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900')}`}
              onClick={() => { 
                setSelectedCategory(value); 
                closeAllDropdowns(); 
              }}
            >
              {Icon && <Icon className="text-xl md:text-2xl" />}
              <span className={`text-left ${selectedCategory === value ? 'font-bold' : ''}`}>
                {label}
              </span>
              {value === 'Boîte de réception' && (() => {
                const count = (emails || []).filter(mail => mail.category === 'Boîte de réception').length;
                return count > 0 ? (
                  <span className="ml-auto bg-blue-100 rounded-full px-2 text-blue-700 text-xs font-semibold">
                    {count}
                  </span>
                ) : null;
              })()}
              {value === 'Important' && (() => {
                const count = (emails || []).filter(mail => mail.category === 'Important').length;
                return count > 0 ? (
                  <span className="ml-auto bg-orange-100 rounded-full px-2 text-orange-700 text-xs font-semibold">
                    {count}
                  </span>
                ) : null;
              })()}
              {value === 'Messages envoyés' && (() => {
                const sentFromLocalStorage = JSON.parse(localStorage.getItem('messageenvoye') || '[]');
                const sentFromJSON = (emails || []).filter(mail => mail.category === 'Messages envoyés');
                const count = sentFromLocalStorage.length + sentFromJSON.length;
                return count > 0 ? (
                  <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-700 text-xs font-semibold">
                    {count}
                  </span>
                ) : null;
              })()}
              {value === 'Corbeille' && (() => {
                const count = (emails || []).filter(mail => mail.category === 'Corbeille').length;
                return count > 0 ? (
                  <span className="ml-auto bg-red-100 rounded-full px-2 text-red-700 text-xs font-semibold">
                    {count}
                  </span>
                ) : null;
              })()}
              {value === 'Archive' && (() => {
                const count = (emails || []).filter(mail => mail.category === 'Archive').length;
                return count > 0 ? (
                  <span className="ml-auto bg-yellow-100 rounded-full px-2 text-yellow-700 text-xs font-semibold">
                    {count}
                  </span>
                ) : null;
              })()}
            </button>
          </li>
        ))}
      </ul>
      {/* Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className={`uppercase font-bold tracking-wider text-sm md:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>Libellés</span>
        </div>
        <ul className="space-y-0.5">
          {LABELS.map(({ label, subs }) => (
            <li key={label}>
              <button className={`flex items-center w-full gap-2 px-3 py-1 text-sm md:text-base rounded-lg ${selectedCategory === label ? (darkMode ? 'bg-blue-900 text-blue-300 font-bold' : 'bg-blue-100 text-blue-700 font-bold') : (darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900')}`}
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
                {/* Compteur uniquement pour les libellés qui ne sont pas "Projets" ou "À propos de moi", et seulement si > 0 */}
                {label !== 'Projets' && label !== 'À propos de moi' && (() => {
                  const count = (emails || []).filter(mail => mail.category === label).length;
                  return count > 0 ? (
                    <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">
                      {count}
                    </span>
                  ) : null;
                })()}
                {subs.length > 0 && (
                  <MdExpandMore className={`text-lg transition-transform ${open.labels[label] ? 'rotate-180' : ''}`} />
                )}
              </button>
              {subs.length > 0 && open.labels[label] && (
                <ul className="ml-6 mt-1 space-y-0.5">
                  {subs.map(sub => (
                    <li key={sub}>
                      <button
                        className={`flex items-center w-full gap-2 px-3 py-1 text-sm rounded-lg ${selectedCategory === sub ? (darkMode ? 'bg-blue-900 text-blue-300 font-bold' : 'bg-blue-100 text-blue-700 font-bold') : (darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900')}`}
                        onClick={() => { setSelectedCategory(sub); closeAllDropdowns(); }}
                      >
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span className="text-left">
                          {sub}
                        </span>
                        {/* Compteur pour les sous-libellés seulement si > 0 */}
                        {(() => {
                          const count = (emails || []).filter(mail => mail.category === sub).length;
                          return count > 0 ? (
                            <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{count}</span>
                          ) : null;
                        })()}
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