import React from "react";

// Composant qui affiche le détail d'un "email" (détail d'un projet, expérience, etc.)
const DetailEmail = () => {
  return (
    <section className="flex-1 bg-white h-full overflow-y-auto p-8 rounded-2xl">
      {/* Exemple de détail, à remplacer par des données dynamiques plus tard */}
      <h2 className="text-base font-bold mb-4 text-blue-700 rounded-xl">Titre du projet ou expérience</h2>
      <p className="text-gray-700 text-base rounded-lg">Description détaillée du projet, des missions, des compétences utilisées, etc.</p>
    </section>
  );
};

export default DetailEmail; 