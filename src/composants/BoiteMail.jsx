import React, { useState } from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmail from "./DetailEmail";

// Composant principal qui structure la boîte mail du portfolio
const BoiteMail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex flex-col h-screen bg-black">
      <EnTete onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <BarreLaterale />}
        <div className="flex flex-1 rounded-2xl overflow-hidden bg-white mx-6">
          <div className={sidebarOpen ? "w-96" : "w-1/2"}>
            <ListeEmails />
          </div>
          <div className={sidebarOpen ? "flex-1" : "w-1/2"}>
            <DetailEmail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteMail; 