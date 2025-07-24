import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { MdInbox, MdSchedule, MdLabelImportant, MdSend, MdDescription, MdEdit, MdDelete } from "react-icons/md";

// Composant de barre latérale façon Gmail (fond noir, icônes, menus déroulants, libellés)
const BarreLaterale = ({ selectedCategory, setSelectedCategory }) => {
  const [open, setOpen] = useState({
    categories: false,
    plus: false,  
    labels: true,
    work: true,
  });

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
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base focus:outline-none ${selectedCategory === 'Boîte de réception' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => { setSelectedCategory('Boîte de réception'); setOpen({ ...open, work: false }); }}
          >
            <MdInbox className="text-2xl" />
            Boîte de réception
          </button>
        </li>
       
      
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Messages envoyés' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => setSelectedCategory('Messages envoyés')}
          >
            <MdSend className="text-2xl" />
            Messages envoyés
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Important' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => setSelectedCategory('Important')}
          >
            <MdLabelImportant className="text-2xl" />
            Important
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Brouillons' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => setSelectedCategory('Brouillons')}
          >
            <MdSchedule className="text-2xl" />
            Brouillons
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Corbeille' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
            onClick={() => setSelectedCategory('Corbeille')}
          >
            <MdDelete className="text-2xl" />
            Corbeille
          </button>
        </li>
      </ul>
      {/* Section Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="uppercase font-bold tracking-wider text-base">Libellés</span>
          <button className="text-2xl text-gray-400 hover:text-white leading-none">+</button>
        </div>
        <ul className="space-y-0.5">
          <li className="flex items-center gap-2 px-3 py-1 text-base">
            <FcFolder className="text-xl" />
            <span className="uppercase">A propos de moi</span>
          </li>
          <li className="flex items-center gap-2 px-3 py-1 text-base">
            <FcFolder className="text-xl" />
            <span>CESI 2024 - CESI 2025</span>
          </li>
        
        
          <li className="flex items-center gap-2 px-3 py-1 text-base">
            <FcFolder className="text-xl" />
            <span>MaisonCléo</span>
          </li>
        </ul>
      </div>
      {/* Dossier Portfolio avec exemples */}
      <button
        className="w-full bg-white rounded-xl uppercase px-3 py-2 mb-1 flex items-center gap-2 transition text-gray-900 font-normal"
        onClick={() => setOpen({ ...open, work: !open.work })}
      >
        <FcFolder className="text-xl " />
        Projets
        <span className="ml-auto text-xl font-bold">{open.work ? '-' : '+'}</span>
      </button>
      {open.work && (
        <ul className="mb-4">
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Web' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
              onClick={() => { setSelectedCategory('Web'); setOpen({ ...open, work: false }); }}
            >
              <span className="flex items-center gap-2">Web</span>
              <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">5</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Mobile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
              onClick={() => { setSelectedCategory('Mobile'); setOpen({ ...open, work: false }); }}
            >
              <span className="flex items-center gap-2">Mobile</span>
              <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">3</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Design' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-900'}`}
              onClick={() => { setSelectedCategory('Design'); setOpen({ ...open, work: false }); }}
            >
              <span className="flex items-center gap-2">Design</span>
              <span className="bg-gray-100 rounded-full px-2 text-gray-900 text-sm font-semibold">4</span>
            </button>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default BarreLaterale; 