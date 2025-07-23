import React from "react";

// Composant qui affiche la liste des "emails" (projets, expériences, etc.)
const ListeEmails = () => {
  return (
    <section className="flex flex-col bg-white h-full overflow-y-auto rounded-2xl">
      {/* Exemple d'éléments, à remplacer par des données dynamiques plus tard */}
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800 text-base rounded-xl">Projet 1 : Application Web</div>
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800 text-base rounded-xl">Projet 2 : API REST</div>
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800 text-base rounded-xl">Expérience : Développeur Frontend</div>
      <div className="px-6 py-4 border-b hover:bg-blue-50 cursor-pointer font-semibold text-gray-800 text-base rounded-xl">Compétence : React, Node.js</div>
    </section>
  );
};

export default ListeEmails; 