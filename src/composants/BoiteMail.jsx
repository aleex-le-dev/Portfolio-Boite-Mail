import React, { useState } from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmail from "./DetailEmail";

// Composant principal qui structure la boîte mail du portfolio
const BoiteMail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Boîte de réception");
  return (
    <div className="flex flex-col h-screen bg-black">
      <EnTete onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <BarreLaterale selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        <div className="w-[30%] mx-0.5">
          <div className="h-full bg-white rounded-2xl overflow-hidden">
            <ListeEmails selectedCategory={selectedCategory} />
          </div>
        </div>
        <div className="w-[70%] mx-0.5">
          <div className="h-full bg-white rounded-2xl overflow-hidden">
            <DetailEmail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteMail; 