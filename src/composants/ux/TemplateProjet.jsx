import React from "react";

// Composant TemplateProjet : template projet individuel élégant, prêt à personnaliser.
const TemplateProjet = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl overflow-y-auto">
      <div className="px-10 pl-8 flex flex-col">
        {/* Titre du projet */}
        <h1 className="text-2xl font-bold mb-2 text-left w-full">
          Titre du projet à personnaliser
        </h1>
        
        {/* En-tête avec avatar, nom et date */}
        <div className="flex items-start gap-3 mb-4 w-full">
          <img 
            src="https://media.licdn.com/dms/image/v2/D4E03AQHsjLWbL7ML0g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672497184613?e=2147483647&v=beta&t=pHUPGHFTtXxg-xkAMXqpxoFItxeqD6u3jm-0ZlYUm0o" 
            alt="Aleex Le Dev" 
            className="w-10 h-10 rounded-full object-cover" 
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-900">Aleex Le Dev</span>
              <span className="text-xs text-gray-500">25/07/2025</span>
            </div>
          </div>
        </div>

        {/* Grande image placeholder */}
        <div className="w-full mb-6">
          <div className="w-full aspect-[16/7] bg-gradient-to-tr from-blue-200 to-blue-400 rounded-xl shadow-lg flex items-center justify-center border border-blue-100">
            <span className="text-2xl text-white font-bold opacity-60">Image du projet</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3">Description</h2>
          <p className="text-gray-900 text-base">
            Présentez ici votre projet, ses objectifs, ses enjeux, le contexte, les utilisateurs visés, les résultats obtenus, etc. Mettez en avant ce qui rend ce projet unique et impactant.
          </p>
        </div>

        {/* Technologies */}
        <div className="w-full mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3">Technologies utilisées</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow-sm hover:bg-blue-200 transition">React</span>
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow-sm hover:bg-blue-200 transition">Tailwind CSS</span>
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow-sm hover:bg-blue-200 transition">Node.js</span>
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow-sm hover:bg-blue-200 transition">Figma</span>
            {/* Ajoutez d'autres technologies ici */}
          </div>
        </div>

        {/* Section personnalisable supplémentaire */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-blue-700 mb-3">Détails supplémentaires</h2>
          <p className="text-gray-900 text-base">
            Ajoutez ici des liens, des vidéos, des témoignages, des captures d'écran, ou toute autre information pertinente pour présenter votre projet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateProjet; 