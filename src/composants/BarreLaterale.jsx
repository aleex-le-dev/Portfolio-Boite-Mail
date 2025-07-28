import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { MdInbox, MdSchedule, MdLabelImportant, MdSend, MdEdit, MdDelete, MdExpandMore, MdArchive } from "react-icons/md";
import { LABELS, NAV_CATEGORIES } from "./constantes";

// Composant de barre latérale façon Gmail (fond noir, icônes, menus déroulants, libellés)
const BarreLaterale = ({ selectedCategory, setSelectedCategory, emails }) => {

  const [open, setOpen] = useState(() => ({
    categories: false,
    plus: false,
    labels: Object.fromEntries(LABELS.map(l => [l.label, false])),
    work: false,
  }));

  // Synchronise dynamiquement les clés de labels si LABELS change (ex: renommage)
  React.useEffect(() => {
    setOpen(o => ({
      ...o,
      labels: Object.fromEntries(LABELS.map(l => [l.label, !!o.labels[l.label]])),
    }));
  }, [LABELS]);

  // Ferme tous les menus déroulants (projets et labels)
  function closeAllDropdowns() {
    setOpen(o => ({
      ...o,
      work: false,
      labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false]))
    }));
  }

  return (
    <aside className="w-auto min-w-fit whitespace-nowrap bg-white text-gray-900 h-full flex flex-col py-4 px-2 overflow-y-auto md:min-w-[240px]">
      {/* Bouton Nouveau message sticky */}
      <div className="sticky top-0 z-10 bg-white pb-2">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 text-sm md:text-base">
          <MdEdit className="text-lg md:text-xl" />
          <span className="hidden sm:inline">Nouveau message</span>
          <span className="sm:hidden">Nouveau</span>
        </button>
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
              {(() => {
                let allMails = [...(emails || [])];
                try {
                  const sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
                  allMails = [...allMails, ...sent];
                } catch {/* ignore */}
                const count = allMails.filter(mail => mail.category === value).length;
                return count > 0 && (
                  <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{count}</span>
                );
              })()}
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
                {label === 'Messages envoyés' && (
                  <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{(emails || []).filter(mail => mail.category === label && !mail.to).length}</span>
                )}
                {label === 'Corbeille' && (
                  <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{
                    (() => {
                      let sent = [];
                      try {
                        sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
                      } catch {/* ignore */}
                      const jsonTrash = (emails || []).filter(e => e.category === 'Corbeille');
                      const allTrash = [...sent.filter(e => e.category === 'Corbeille'), ...jsonTrash.filter(js => !sent.find(s => s.id === js.id))];
                      return allTrash.length;
                    })()
                  }</span>
                )}
                {label !== 'Messages envoyés' && label !== 'Corbeille' && (
                  <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{(emails || []).filter(mail => mail.category === label).length}</span>
                )}
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