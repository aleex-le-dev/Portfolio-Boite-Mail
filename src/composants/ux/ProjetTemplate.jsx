import React from "react";

// Composant ProjetTemplate : affiche un template personnalisé pour la catégorie 'Mes projets'.
// Utilisation : à afficher à la place de la liste d'emails quand la catégorie sélectionnée est 'Mes projets'.
// Permet d'ajouter du contenu, des boutons, des liens, etc. sans dépendre du fichier JSON.
const TemplateProjet = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-2xl p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Mes projets</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Découvrez ici une présentation personnalisée de vos projets, avec la possibilité d'ajouter des descriptions, des liens, des images, ou tout autre contenu spécifique.
      </p>
      {/* Exemple de contenu personnalisé */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Projet Web</h2>
          <p className="text-gray-600 mb-2">Description personnalisée du projet web.</p>
          <a href="#" className="text-blue-600 underline">Voir plus</a>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Projet Mobile</h2>
          <p className="text-gray-600 mb-2">Description personnalisée du projet mobile.</p>
          <a href="#" className="text-blue-600 underline">Voir plus</a>
        </div>
        {/* Ajouter d'autres blocs projets ici */}
      </div>
    </div>
  );
};

export default TemplateProjet; 