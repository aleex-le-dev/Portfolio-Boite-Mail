// Composant principal qui structure la boîte mail du portfolio

import React, { useState, useEffect } from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmailView from "./ux/DetailEmailView";

const BoiteMail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Boîte de réception");
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  useEffect(() => {
    fetch("./src/composants/email.json")
      .then(res => res.json())
      .then(data => setEmails(data));
  }, []);

  // Filtrer les emails selon la catégorie sélectionnée
  const filteredEmails = emails.filter(e => e.category === selectedCategory);
  // Sélectionner le mail courant
  const selectedEmail = filteredEmails.find(e => e.id === selectedEmailId) || filteredEmails[0];

  // Si la catégorie change, reset la sélection
  useEffect(() => {
    setSelectedEmailId(filteredEmails[0]?.id || null);
  }, [selectedCategory, emails]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <EnTete onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <BarreLaterale selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        <div className="w-[30%] mx-0.5 min-w-[280px]">
          <div className="h-full bg-white rounded-2xl overflow-hidden">
            <ListeEmails
              selectedCategory={selectedCategory}
              emails={filteredEmails}
              selectedEmailId={selectedEmailId}
              setSelectedEmailId={setSelectedEmailId}
            />
          </div>
        </div>
        <div className="w-[70%] mx-0.5">
          <div className="h-full bg-white rounded-2xl overflow-hidden flex items-center justify-center">
            {filteredEmails.length > 0 && selectedEmail ? (
              <DetailEmailView {...selectedEmail} />
            ) : (
              <div className="text-gray-400 text-lg">Vous n'avez sélectionné aucune conversation.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteMail; 