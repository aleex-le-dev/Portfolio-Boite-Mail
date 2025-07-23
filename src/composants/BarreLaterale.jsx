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
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl font-bold text-base focus:outline-none ${selectedCategory === 'Boîte de réception' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Boîte de réception')}
          >
            <MdInbox className="text-2xl" />
            Boîte de réception
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'Messages suivis' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Messages suivis')}
          >
            <MdStar className="text-2xl" />
            Messages suivis
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl text-base ${selectedCategory === 'En attente' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('En attente')}
          >
            <MdSchedule className="text-2xl" />
            En attente
          </button>
        </li>
        <li>
          <button className={`flex items-center w-full gap-3 px-3 py-2 rounded-2xl font-semibold text-base ${selectedCategory === 'Important' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-white/80'}`}
            onClick={() => setSelectedCategory('Important')}
          >
            <MdLabelImportant className="text-2xl" />
            Important
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
      {/* Dossier Work avec exemples */}
      <button
        className={`w-full bg-blue-50/10 rounded-xl px-3 py-2 mb-1 flex items-center gap-2 font-semibold transition ${selectedCategory === 'Work' ? 'bg-blue-400/30 text-blue-200' : 'text-blue-400'} ${open.work ? 'bg-blue-50/20' : ''}`}
        onClick={() => setSelectedCategory('Work')}
      >
        <FcFolder className="text-xl" />
        Work
      </button>
      {open.work && (
        <ul className="mb-4">
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Creative' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Creative')}
            >
              <span className="flex items-center gap-2">Creative</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">11</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Development' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Development')}
            >
              <span className="flex items-center gap-2">Development</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">6</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Email Marketing' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Email Marketing')}
            >
              <span className="flex items-center gap-2">Email Marketing</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">10</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Paid Media' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Paid Media')}
            >
              <span className="flex items-center gap-2">Paid Media</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">1</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'SMS Marketing' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('SMS Marketing')}
            >
              <span className="flex items-center gap-2">SMS Marketing</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">7</span>
            </button>
          </li>
          <li>
            <button className={`flex items-center justify-between w-full py-1 px-2 rounded-lg ${selectedCategory === 'Strategy' ? 'bg-blue-500/30 text-white' : ''}`}
              onClick={() => setSelectedCategory('Strategy')}
            >
              <span className="flex items-center gap-2">Strategy</span>
              <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">2</span>
            </button>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default BarreLaterale; 