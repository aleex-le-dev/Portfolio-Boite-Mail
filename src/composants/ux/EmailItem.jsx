import React from "react";
import { HiPaperClip } from "react-icons/hi";
import { MdAttachFile } from "react-icons/md";

const EmailItem = ({ avatar, name, subject, preview, date, badge, calendar, image, onClick, darkMode, isSelected }) => {
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (dateString === "À l'instant") {
      return "Aujourd'hui";
    }
    return dateString;
  };

  return (
    <div
      className="flex items-start gap-3 md:gap-3 px-4 md:px-4 py-3 md:py-3 border-b cursor-pointer transition"
      onClick={onClick}
    >
      <img src={avatar} alt={name} className="w-10 h-10 md:w-10 md:h-10 rounded-full object-cover mt-1 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`font-semibold truncate text-lg md:text-base ${isSelected ? 'text-white' : (darkMode ? 'text-white' : 'text-black')}`}>{name}</span>
            {badge && <span className="inline-block w-3 h-3 md:w-2 md:h-2 bg-green-500 rounded-full ml-2 md:ml-1"></span>}
          </div>
          <div className="flex items-center gap-3 md:gap-2">
            {calendar && (
              <svg className={`w-5 h-5 md:w-5 md:h-5 ${isSelected ? 'text-white' : (darkMode ? 'text-gray-400' : 'text-gray-400')}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            )}
            <span className={`text-sm md:text-xs whitespace-nowrap ${isSelected ? 'text-white' : (darkMode ? 'text-gray-300' : 'text-gray-500')}`}>{formatDate(date)}</span>
          </div>
        </div>
        <div className={`truncate -mt-0.5 flex items-center gap-3 md:gap-2 ${isSelected ? 'text-white' : (darkMode ? 'text-white' : 'text-gray-800')}`}>
          {subject && subject.includes('OpenAI') ? (
            <>
              <span className="text-lg md:text-base">Candidature spontanée</span>
              {image && <MdAttachFile className={`inline-block text-lg md:text-lg ${isSelected ? 'text-white' : (darkMode ? 'text-white' : 'text-black')}`} title="Pièce jointe" />}
            </>
          ) : (
            <span className="text-lg md:text-base">{subject}</span>
          )}
        </div>
        <div className={`text-base md:text-sm truncate ${isSelected ? 'text-white' : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>{preview}</div>
      </div>
    </div>
  );
};

export default EmailItem; 