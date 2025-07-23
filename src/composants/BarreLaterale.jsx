import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";

// Composant de barre latérale façon Gmail (fond noir, icônes, menus déroulants, libellés)
const BarreLaterale = () => {
  const [open, setOpen] = useState({
    categories: false,
    plus: false,
    labels: true,
  });

  return (
    <aside className="w-72 bg-black text-white h-full flex flex-col py-4 px-2 overflow-y-auto border-r border-gray-800">
      {/* Section navigation principale */}
      <ul className="space-y-1 mb-6">
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl bg-gray-800 font-bold text-lg focus:outline-none">
            <span className="material-icons">inbox</span>
            Boîte de réception
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800">
            <span className="material-icons">star</span>
            Messages suivis
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800">
            <span className="material-icons">schedule</span>
            En attente
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl bg-gray-800 font-semibold">
            <span className="material-icons">label_important</span>
            Important
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800">
            <span className="material-icons">send</span>
            Messages envoyés
            <span className="ml-2 text-green-400">✔✔</span>
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800">
            <span className="material-icons">description</span>
            Brouillons
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800">
            <span className="material-icons">contacts</span>
            Contacts
          </button>
        </li>
        <li>
          <button className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800">
            <span className="material-icons">attach_file</span>
            Attachments
          </button>
        </li>
        {/* Catégories déroulantes */}
        <li>
          <button
            className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800"
            onClick={() => setOpen({ ...open, categories: !open.categories })}
          >
            <span className="material-icons">label</span>
            Catégories
            <span className="ml-auto text-xl font-bold">
              {open.categories ? '-' : '+'}
            </span>
          </button>
          {open.categories && (
            <ul className="ml-10 mt-1 space-y-1 text-gray-300 text-sm">
              <li>Projets</li>
              <li>Perso</li>
              <li>Clients</li>
            </ul>
          )}
        </li>
        {/* Plus déroulant */}
        <li>
          <button
            className="flex items-center w-full gap-3 px-3 py-2 rounded-2xl hover:bg-gray-800"
            onClick={() => setOpen({ ...open, plus: !open.plus })}
          >
            <span className="material-icons">expand_more</span>
            Plus
            <span className="ml-auto text-xl font-bold">
              {open.plus ? '-' : '+'}
            </span>
          </button>
          {open.plus && (
            <ul className="ml-10 mt-1 space-y-1 text-gray-300 text-sm">
              <li>Archives</li>
              <li>Corbeille</li>
            </ul>
          )}
        </li>
      </ul>
      {/* Section Libellés */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="uppercase text-gray-300 font-bold tracking-wider text-sm">Libellés</span>
          <button className="text-2xl text-gray-400 hover:text-white leading-none">+</button>
        </div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 px-3 py-1">
            <FcOpenedFolder className="text-xl" />
            <span>CDA / ADAPECO</span>
          </li>
          <li className="flex items-center gap-2 px-3 py-1">
            <FcOpenedFolder className="text-xl" />
            <span>CESI 2024 - CESI 2025</span>
          </li>
          <li className="flex items-center gap-2 px-3 py-1">
            <FcOpenedFolder className="text-xl" />
            <span>Généalogie</span>
          </li>
          <li className="flex items-center gap-2 px-3 py-1">
            <FcOpenedFolder className="text-xl" />
            <span>Lieres</span>
          </li>
          <li className="flex items-center gap-2 px-3 py-1">
            <FcOpenedFolder className="text-xl" />
            <span>Maison</span>
          </li>
          <li className="flex items-center gap-2 px-3 py-1">
            <FcOpenedFolder className="text-xl" />
            <span>MaisonCléo</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default BarreLaterale; 