import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { MdInbox, MdStar, MdSchedule, MdLabelImportant, MdSend, MdDescription, MdLabel, MdExpandMore, MdEdit } from "react-icons/md";

// Composant de barre latérale façon Gmail (fond noir, icônes, menus déroulants, libellés)
const BarreLaterale = () => {
  const [open, setOpen] = useState({
    categories: false,
    plus: false,
    labels: true,
    work: true, // état pour le dossier Work
  });

  return (
    <aside className="w-72 bg-black text-white h-full flex flex-col py-4 px-2 overflow-y-auto border-r border-gray-800">
      {/* Bouton Nouveau message */}
      <button className="w-full mb-4 py-3 bg-gray-50 hover:bg-gray-200 text-black font-bold rounded-2xl transition flex items-center justify-center gap-2">
        <MdEdit className="text-xl" />
        Nouveau message
      </button>
      {/* Section navigation principale */}
      <ul className="space-y-0 mb-2">
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl bg-gray-800 font-bold text-base focus:outline-none">
            <MdInbox className="text-2xl" />
            Boîte de réception
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800 text-base">
            <MdStar className="text-2xl" />
            Messages suivis
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800 text-base">
            <MdSchedule className="text-2xl" />
            En attente
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl bg-gray-800 font-semibold text-base">
            <MdLabelImportant className="text-2xl" />
            Important
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800 text-base">
            <MdSend className="text-2xl" />
            Messages envoyés
            <span className="ml-2 text-green-400">✔✔</span>
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800 text-base">
            <MdDescription className="text-2xl" />
            Brouillons
          </button>
        </li>
   
     
        {/* Catégories déroulantes */}
        <li>
          <button
            className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800 text-base"
            onClick={() => setOpen({ ...open, categories: !open.categories })}
          >
            <MdLabel className="text-2xl" />
            Catégories
            <span className="ml-auto text-xl font-bold">
              {open.categories ? '-' : '+'}
            </span>
          </button>
          {open.categories && (
            <ul className="ml-10 mt-0.5 space-y-0.5 text-gray-300 text-base">
              <li>Projets</li>
              <li>Perso</li>
              <li>Clients</li>
            </ul>
          )}
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
        className={`w-full bg-blue-50/10 rounded-xl px-3 py-2 mb-1 flex items-center gap-2 text-blue-400 font-semibold transition ${open.work ? 'bg-blue-50/20' : ''}`}
        onClick={() => setOpen({ ...open, work: !open.work })}
      >
        <FcFolder className="text-xl" />
        Work
      </button>
      {open.work && (
        <ul className="mb-4">
          <li className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-white">Creative</span>
            <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">11</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-white">Development</span>
            <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">6</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-white">Email Marketing</span>
            <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">10</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-white">Paid Media</span>
            <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">1</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-white">SMS Marketing</span>
            <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">7</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-white">Strategy</span>
            <span className="bg-white rounded-full px-2 text-black text-sm font-semibold">2</span>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default BarreLaterale; 