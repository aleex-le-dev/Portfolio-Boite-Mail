import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { MdInbox, MdSchedule, MdLabelImportant, MdSend, MdEdit, MdDelete, MdExpandMore, MdArchive } from "react-icons/md";
import emailsData from "./email.json";

// Composant de barre latérale façon Gmail (fond noir, icônes, menus déroulants, libellés)
const BarreLaterale = ({ selectedCategory, setSelectedCategory }) => {
  const [open, setOpen] = useState({
    categories: false,
    plus: false,
    labels: {
      "Projets": false,
      "A propos de moi": false
    },
    work: false,
  });

  // Fonction utilitaire pour compter les mails d'une catégorie
  const getMailCountByCategory = (cat) => {
    return (emailsData || []).filter(mail => mail.category === cat).length;
  };

  // Ferme tous les menus déroulants (projets et labels)
  function closeAllDropdowns() {
    setOpen(o => ({
      ...o,
      work: false,
      labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false]))
    }));
  }

  // Définition des catégories principales pour la navigation
  const NAV_CATEGORIES = [
    { label: 'Boîte de réception', value: 'Boîte de réception', icon: MdInbox },
    { label: 'Messages envoyés', value: 'Messages envoyés', icon: MdSend },
    { label: 'Important', value: 'Important', icon: MdLabelImportant },
    { label: 'Archive', value: 'Archive', icon: MdArchive },
    { label: 'Brouillons', value: 'Brouillons', icon: MdSchedule },
    { label: 'Corbeille', value: 'Corbeille', icon: MdDelete },
    
  ];

  // Définition des libellés et sous-libellés pour la section libellés
  const LABELS_CONFIG = [
    {
      label: 'Projets',
      subs: ['Web', 'Mobile', 'Design', 'Exemple 1', 'Exemple 2']
    },
    {
      label: 'A propos de moi',
      subs: ['Exemple 1', 'Exemple 2']
    }
  ];

  return (
    <aside className="w-auto min-w-fit whitespace-nowrap bg-white text-gray-900 h-full flex flex-col py-4 px-2 overflow-y-auto ">
      {/* Bouton Nouveau message sticky */}
      <div className="sticky top-0 z-10 bg-white pb-2">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2">
          <MdEdit className="text-xl" />
          Nouveau message
        </button>
      </div>
      {/* Section navigation principale */}
      <ul className="space-y-0 mb-2">
        {NAV_CATEGORIES.map(({ label, value, icon: Icon }) => (
          <li key={value}>
            <button
              className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base focus:outline-none ${selectedCategory === value ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
              onClick={() => { setSelectedCategory(value); closeAllDropdowns(); }}
            >
              {Icon && <Icon className="text-2xl" />}
              <span className={`w-35 text-left ${selectedCategory === value ? 'font-bold' : ''}`}>{label}</span>
              {getMailCountByCategory(value) > 0 && (
                <span className="ml-auto bg-gray-100 rounded-full px-2 text-gray-900 text-xs font-semibold">{getMailCountByCategory(value)}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="uppercase font-bold tracking-wider text-base">Libellés</span>
        </div>
        <ul className="space-y-0.5">
          {LABELS_CONFIG.map(({ label, subs }) => (
            <li key={label}>
              <button className="flex items-center w-full gap-2 px-3 py-1 text-base rounded-lg hover:bg-gray-100 text-gray-900"
                onClick={() => {
                  setOpen(o => ({
                    ...o,
                    labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, l === label ? !o.labels[l] : false])),
                    work: false
                  }));
                }}
              >
                <FcFolder className="text-xl" />
                <span className="uppercase">{label}</span>
                <MdExpandMore className={`ml-auto text-xl font-bold transition-transform duration-200 ${open.labels[label] ? 'rotate-180' : ''}`} />
              </button>
              {open.labels[label] && (
                <ul className="mb-4">
                  {subs.map(sub => (
                    <li key={sub}>
                      <button className="flex items-center justify-between w-full py-1 px-2 rounded-lg hover:bg-gray-100 text-gray-900"
                        onClick={() => { setSelectedCategory(sub); setOpen(o => ({ ...o, labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false])) })); }}
                      >
                        <span className="flex items-center gap-2">{sub}</span>
                        <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">{getMailCountByCategory(sub)}</span>
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