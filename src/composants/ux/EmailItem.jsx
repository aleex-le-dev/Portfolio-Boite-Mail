import React from "react";
import { HiPaperClip } from "react-icons/hi";
import { MdAttachFile } from "react-icons/md";

const EmailItem = ({ avatar, name, subject, preview, date, badge, calendar, image, onClick }) => (
  <div
    className="flex items-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 border-b cursor-pointer transition"
    onClick={onClick}
  >
    <img src={avatar} alt={name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mt-1 flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-900 truncate text-sm md:text-base">{name}</span>
          {badge && <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1"></span>}
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          {calendar && (
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          )}
          <span className="text-xs text-gray-500 whitespace-nowrap">{date}</span>
        </div>
      </div>
      <div className="text-gray-800 truncate -mt-0.5 flex items-center gap-2">
        {subject && subject.includes('OpenAI') ? (
          <>
            <span className="text-sm md:text-base">Candidature spontanée</span>
            {image && <MdAttachFile className="inline-block text-base md:text-lg text-black" title="Pièce jointe" />}
          </>
        ) : (
          <span className="text-sm md:text-base">{subject}</span>
        )}
      </div>
      <div className="text-gray-600 text-xs md:text-sm truncate">{preview}</div>
    </div>
  </div>
);

export default EmailItem; 