import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiTrash2, FiArchive, FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import RepondreMail from "./RepondreMail";

const DetailEmailView = ({
  title = "Titre du mail",
  sender = "Nom Expéditeur",
  senderAvatar = "https://randomuser.me/api/portraits/men/32.jpg",
  date = "01 Janv. 2024",
  summary = "Résumé du mail...",
  image,
  content = "Contenu détaillé du mail...",
  page = "1 / 1"
}) => {
  const [showReply, setShowReply] = useState(false);

  // Fermer le formulaire au clic sur overlay ou croix
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("repondre-mail-overlay")) setShowReply(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl overflow-y-auto">
      {/* Barre d'actions en haut, hauteur fixe */}
      <div className="flex items-center justify-between px-6 border-b bg-gray-50 sticky top-0 z-10 text-xs text-gray-500 h-8 min-h-8 rounded-tr-2xl">
        <div className="flex items-center gap-2">
          <button className="p-0.5 rounded hover:bg-gray-200"><FiArrowLeft className="text-sm" /></button>
          <button className="p-0.5 rounded hover:bg-gray-200"><FiArrowRight className="text-sm" /></button>
          <button className="p-0.5 rounded hover:bg-gray-200"><FiArchive className="text-sm" /></button>
          <button className="p-0.5 rounded hover:bg-gray-200"><FiTrash2 className="text-sm" /></button>
        </div>
        <div className="font-semibold">{page}</div>
      </div>
      {/* Corps du mail */}
      <div className="flex-1 px-10 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
        <div className="flex items-center gap-3 mb-4">
          <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-gray-900">{sender}</div>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
        </div>
        <div className="text-gray-700 text-base mb-4 text-center max-w-2xl">{summary}</div>
        {image && (
          <img src={image} alt="illustration" className="rounded-xl mb-6 max-w-full max-h-72 object-cover" />
        )}
        <div className="text-gray-900 text-base max-w-2xl w-full mt-2">
          {content}
        </div>
      </div>
      {/* Barre d'actions en bas */}
      <div className="flex gap-6 px-10 pb-8 pt-2">
        <button
          className="flex items-center gap-2 border border-gray-400 rounded-full px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 transition"
          onClick={() => setShowReply(true)}
        >
          <FiCornerUpLeft className="text-base" />
          Répondre
        </button>
        <button className="flex items-center gap-2 border border-gray-400 rounded-full px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 transition">
          <FiCornerUpRight className="text-base" />
          Transférer
        </button>
      </div>
      {showReply && (
        <div className="repondre-mail-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/10" onClick={handleOverlayClick}>
          <RepondreMail onClose={() => setShowReply(false)} />
        </div>
      )}
    </div>
  );
};

export default DetailEmailView; 