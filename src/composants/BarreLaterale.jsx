import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { MdInbox, MdStar, MdSchedule, MdLabelImportant, MdSend, MdDescription, MdLabel, MdExpandMore, MdEdit } from "react-icons/md";

// Composant de barre latérale façon Gmail (fond noir, icônes, menus déroulants, libellés)
const BarreLaterale = ({ selectedCategory, setSelectedCategory }) => {
  const [open] = useState({
    categories: false,
    plus: false,
    labels: true,
    work: true,
  });

  return (
    <aside className="w-72 bg-black text-white h-full flex flex-col py-4 px-2 overflow-y-auto border-r border-gray-800">
      {/* Bouton Nouveau message */}
      <button className={`w-full mb-4 py-3 bg-black hover:bg-gray-200 font-bold rounded-2xl transition flex items-center justify-center gap-2 ${selectedCategory === 'Nouveau message' ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setSelectedCategory('Nouveau message')}
      >
        <MdEdit className="text-xl"  />
        Nouveau message
      </button>
      {/* Section navigation principale */}
      <ul className="space-y-0 mb-2">
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl font-bold text-base focus:outline-none ${selectedCategory === 'Projets' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Projets')}
          >
            <MdInbox className="text-2xl" />
            Projets
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Compétences' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Compétences')}
          >
            <MdStar className="text-2xl" />
            Compétences
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Expériences' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Expériences')}
          >
            <MdSchedule className="text-2xl" />
            Expériences
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl font-semibold text-base ${selectedCategory === 'Contact' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Contact')}
          >
            <MdLabelImportant className="text-2xl" />
            Contact
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Messages envoyés' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Messages envoyés')}
          >
            <MdSend className="text-2xl" />
            Messages envoyés
            <span className="ml-2 text-green-400">✔✔</span>
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Brouillons' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Brouillons')}
          >
            <MdDescription className="text-2xl" />
            Brouillons
          </button>
        </li>
      </ul>
      {/* Section Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="uppercase text-gray-300 font-bold tracking-wider text-base">Libellés</span>
          <button className="text-2xl text-gray-400 hover:text-white leading-none">+</button>
        </div>
        <ul className="space-y-0.5">
          <li className="flex items-center gap-2 px-3 py-1 text-base">
            <FcFolder className="text-xl" />
            <span>CDA / ADAPECO</span>
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
        className={`w-full bg-blue-50/10 rounded-xl px-3 py-2 mb-1 flex items-center gap-2 font-semibold transition ${selectedCategory === 'Portfolio' ? 'bg-blue-400/30 text-blue-200' : 'text-blue-400'} ${open.work ? 'bg-blue-50/20' : ''}`}
        onClick={() => setSelectedCategory('Portfolio')}
      >
        <FcFolder className="text-xl" />
        Portfolio
      </button>
      {open.work && (
        <ul className="mb-4">
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Web' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Web')}
            >
              <span className="flex items-center gap-2">Web</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">5</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Mobile' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Mobile')}
            >
              <span className="flex items-center gap-2">Mobile</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">3</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Design' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Design')}
            >
              <span className="flex items-center gap-2">Design</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">4</span>
            </button>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default BarreLaterale; 