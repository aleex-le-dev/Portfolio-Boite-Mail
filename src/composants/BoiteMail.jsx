// Composant principal qui structure la boîte mail du portfolio

import React, { useState } from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmail from "./DetailEmail";

const BoiteMail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Boîte de réception");
  // Je récupère la logique d'absence de mail pour la passer au détail
  const hasMail = selectedCategory === "Boîte de réception";
  return (
    <div className="flex flex-col h-screen bg-white">
      <EnTete onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <BarreLaterale selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        <div className="w-[30%] mx-0.5 min-w-[280px]">
          <div className="h-full bg-white rounded-2xl overflow-hidden">
            <ListeEmails selectedCategory={selectedCategory} />
          </div>
        </div>
        <div className="w-[70%] mx-0.5">
          <div className="h-full bg-white rounded-2xl overflow-hidden flex items-center justify-center">
            {hasMail ? <DetailEmail /> : <div className="text-gray-400 text-lg">Vous n'avez sélectionné aucune conversation.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteMail; 