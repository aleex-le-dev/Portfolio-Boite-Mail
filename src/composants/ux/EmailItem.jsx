import React from "react";

// Composant EmailItem : affiche un élément de portfolio (projet, compétence, expérience, contact)
// Props : avatar (url), name (string), subject (string|JSX), preview (string|JSX), date (string), badge (bool), calendar (bool), onClick (fn)
const EmailItem = ({ avatar, name, subject, preview, date, badge, calendar, onClick }) => (
  <div
    className="flex items-start gap-3 px-4 py-3 border-b cursor-pointer transition bg-white hover:bg-blue-50"
    onClick={onClick}
  >
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover mt-1" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-900 truncate">{name}</span>
          {badge && <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1"></span>}
        </div>
        <div className="flex items-center gap-2">
          {calendar && (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          )}
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{date}</span>
        </div>
      </div>
      <div className="text-gray-800 truncate -mt-0.5">{subject}</div>
      <div className="text-gray-600 text-sm truncate">{preview}</div>
    </div>
  </div>
);

export default EmailItem; 