import React from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmail from "./DetailEmail";

// Composant principal qui structure la boîte mail du portfolio
const BoiteMail = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <EnTete />
      <div className="flex flex-1 overflow-hidden">
        <BarreLaterale />
        <ListeEmails />
        <DetailEmail />
      </div>
    </div>
  );
};

export default BoiteMail; 