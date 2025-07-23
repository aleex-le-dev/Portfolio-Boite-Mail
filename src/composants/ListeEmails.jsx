import React from "react";

// Composant qui affiche la liste des "emails" (projets, expériences, etc.)
const ListeEmails = () => {
  return (
    <section className="flex flex-col w-96 bg-white border-r h-full overflow-y-auto">
      {/* Exemple d'éléments, à remplacer par des données dynamiques plus tard */}
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800">Projet 1 : Application Web</div>
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800">Projet 2 : API REST</div>
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800">Expérience : Développeur Frontend</div>
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800">Compétence : React, Node.js</div>
    </section>
  );
};

export default ListeEmails; 