import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { MdInbox, MdSchedule, MdLabelImportant, MdSend, MdEdit, MdDelete, MdExpandMore, MdArchive } from "react-icons/md";

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

  // Ferme tous les menus déroulants (projets et labels)
  function closeAllDropdowns() {
    setOpen(o => ({
      ...o,
      work: false,
      labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false]))
    }));
  }

  return (
    <aside className="w-auto min-w-fit min-w-[220px] whitespace-nowrap bg-white text-gray-900 h-full flex flex-col py-4 px-2 overflow-y-auto ">
      {/* Bouton Nouveau message sticky */}
      <div className="sticky top-0 z-10 bg-white pb-2">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2">
          <MdEdit className="text-xl" />
          Nouveau message
        </button>
      </div>
      {/* Section navigation principale */}
      <ul className="space-y-0 mb-2">
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base focus:outline-none ${selectedCategory === 'Boîte de réception' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Boîte de réception'); closeAllDropdowns(); }}
          >
            <MdInbox className="text-2xl" />
            Boîte de réception
          </button>
        </li>
       
      
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base focus:outline-none ${selectedCategory === 'Messages envoyés' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Messages envoyés'); closeAllDropdowns(); }}
          >
            <MdSend className="text-2xl" />
            Messages envoyés
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Important' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Important'); closeAllDropdowns(); }}
          >
            <MdLabelImportant className="text-2xl" />
            Important
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Archive' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Archive'); closeAllDropdowns(); }}
          >
            <MdArchive className="text-2xl" />
            Archive
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Brouillons' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Brouillons'); closeAllDropdowns(); }}
          >
            <MdSchedule className="text-2xl" />
            Brouillons
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Corbeille' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Corbeille'); closeAllDropdowns(); }}
          >
            <MdDelete className="text-2xl" />
            Corbeille
          </button>
        </li>
      </ul>

      {/* Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="uppercase font-bold tracking-wider text-base">Libellés</span>
        </div>
        <ul className="space-y-0.5">
          {Object.entries(open.labels).map(([label, isOpen]) => (
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
                <MdExpandMore className={`ml-auto text-xl font-bold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && label === 'Projets' && (
                <ul className="mb-4">
                  <li>
                    <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Web' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
                      onClick={() => { setSelectedCategory('Web'); setOpen(o => ({ ...o, labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false])) })); }}
                    >
                      <span className="flex items-center gap-2">Web</span>
                      <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">5</span>
                    </button>
                  </li>
                  <li>
                    <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Mobile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
                      onClick={() => { setSelectedCategory('Mobile'); setOpen(o => ({ ...o, labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false])) })); }}
                    >
                      <span className="flex items-center gap-2">Mobile</span>
                      <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">3</span>
                    </button>
                  </li>
                  <li>
                    <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Design' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
                      onClick={() => { setSelectedCategory('Design'); setOpen(o => ({ ...o, labels: Object.fromEntries(Object.keys(o.labels).map(l => [l, false])) })); }}
                    >
                      <span className="flex items-center gap-2">Design</span>
                      <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">4</span>
                    </button>
                  </li>
                </ul>
              )}
              {isOpen && label === 'A propos de moi' && (
                <ul className="mb-2">
                  <li>
                    <button className="flex items-center justify-between w-full py-1 px-2 rounded-lg hover:bg-gray-100 text-gray-900">
                      <span className="flex items-center gap-2">Exemple 1</span>
                      <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">2</span>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center justify-between w-full py-1 px-2 rounded-lg hover:bg-gray-100 text-gray-900">
                      <span className="flex items-center gap-2">Exemple 2</span>
                      <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">1</span>
                    </button>
                  </li>
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