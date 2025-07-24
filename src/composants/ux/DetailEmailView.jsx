import React, { useState } from "react";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import RepondreMail from "./RepondreMail";

const DetailEmailView = ({
  title = "Titre du mail",
  sender = "Nom Expéditeur",
  senderAvatar = "https://randomuser.me/api/portraits/men/32.jpg",
  date = "01 Janv. 2024",
  image,
  content = "Contenu détaillé du mail...",
  email = "email@example.com", 
  onSendMail,
  category
}) => {
  const [showReply, setShowReply] = useState(false);

  // Fermer le formulaire au clic sur overlay ou croix
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("repondre-mail-overlay")) setShowReply(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl overflow-y-auto">
      {/* Corps du mail */}
      <div className="flex-1 px-10 pl-8 flex flex-col items-center">
        {category !== 'Messages envoyés' && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-left w-full">{title}</h1>
            <div className="flex items-center gap-3 mb-4 w-full">
              <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <div className="font-semibold text-gray-900">{sender}</div>
                <div className="text-xs text-gray-500">{date}</div>
              </div>
            </div>
            {image && (
              <img src={image} alt="illustration" className="rounded-xl mb-6 object-cover max-w-full max-h-72" />
            )}
          </>
        )}
        <div className="text-gray-900 text-base max-w-2xl w-full mt-2">
          {Array.isArray(content) && category === 'Messages envoyés' && content.length > 1 ? (
            <>
              <h1 className="text-2xl font-bold mb-2 text-left w-full">{title}</h1>
              <div className="flex items-start gap-3 mb-2">
                {senderAvatar &&
                  <img src={senderAvatar} alt={sender} className="w-8 h-8 rounded-full object-cover border border-gray-300 mt-1" />
                }
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm font-semibold text-gray-900">{sender}</div>
                  <div className="text-xs text-gray-500 mb-2">{date}</div>
                  {image && <img src={image} alt="illustration" className="rounded-xl mb-4 object-cover max-w-[120px] max-h-[80px]" />}
                  {content.slice(0, -1).map((c, i) =>
                    <div key={i} className="text-gray-900 text-base whitespace-pre-line">{c}</div>
                  )}
                </div>
              </div>
              <hr className="my-4 border-t-2 border-gray-200" />
              <div className="flex items-start gap-3 mt-4">
                <img src="https://media.licdn.com/dms/image/v2/D4E03AQHsjLWbL7ML0g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672497184613?e=2147483647&v=beta&t=pHUPGHFTtXxg-xkAMXqpxoFItxeqD6u3jm-0ZlYUm0o" alt="alex@salutalex.fr" className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" />
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-gray-900">alex@salutalex.fr</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {date} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-gray-900 text-base whitespace-pre-line">{content[content.length - 1]}</div>
                </div>
              </div>
            </>
          ) : Array.isArray(content) ? content.map((c, i) => <div key={i}>{c}</div>) : content}
        </div>
      </div>
      {/* Barre d'actions en bas */}
      {category !== 'Messages envoyés' && (
        <div className="flex justify-center gap-6 px-10 pb-8 pt-2">
          <button
            className="flex items-center gap-2 border border-gray-400 rounded-full px-6 py-2 text-gray-700 font-medium hover:bg-gray-50 transition"
            onClick={() => setShowReply(true)}
          >
            <FiCornerUpLeft className="text-base" />
            Répondre
          </button>
        </div>
      )}
      {showReply && (
        <div className="repondre-mail-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/10" onClick={handleOverlayClick}>
          <RepondreMail onClose={() => setShowReply(false)} from={email} subject={title} onSendMail={onSendMail} />
        </div>
      )}
    </div>
  );
};

export default DetailEmailView; 