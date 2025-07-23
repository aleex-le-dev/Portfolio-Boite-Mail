import React from "react";
import { FiSettings, FiUser } from "react-icons/fi";
import { MdMenu } from "react-icons/md";

// Composant d'en-tête de la boîte mail (barre supérieure)
// Props : onToggleSidebar (fonction pour ouvrir/fermer la barre latérale)
const EnTete = ({ onToggleSidebar }) => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-black shadow-sm">
      {/* Groupe menu + titre */}
      <div className="flex items-center">
        <button className="flex items-center justify-center h-8 w-8 p-0 rounded-full hover:bg-gray-800 transition mt-1" onClick={onToggleSidebar} aria-label="Ouvrir/fermer la barre latérale">
          <MdMenu className="text-2xl text-white" />
        </button>
        <div className="font-bold text-2xl text-white ml-1">Salutalex.fr</div>
      </div>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher dans les messages"
        className="w-96 mx-8 px-4 py-2 rounded-2xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-800 transition" aria-label="Paramètres">
          <FiSettings className="text-2xl text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-800 transition" aria-label="Profil">
          <FiUser className="text-2xl text-white" />
        </button>
      </div>
    </header>
  );
};

export default EnTete; 