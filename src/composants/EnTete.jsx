import React from "react";

// Composant d'en-tête (logo, barre de recherche, boutons principaux)
const EnTete = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white shadow border-b">
      {/* Logo et titre du portfolio */}
      <div className="font-bold text-2xl text-blue-700">Portfolio.</div>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* Bouton de contact */}
      <button className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Contactez-moi</button>
    </header>
  );
};

export default EnTete; 