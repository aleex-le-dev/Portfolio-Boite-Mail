// Composant pour afficher le formulaire de réponse à un mail

import React, { useState } from "react";
import { LuSendHorizontal, } from "react-icons/lu";
import { RiCloseLargeLine } from "react-icons/ri";


const RepondreMail = ({
  from = "hello@mattered.com",
  subject = "",
  onClose,
  onSendMail,
  darkMode = false
}) => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSendMail) {
      onSendMail({
        subject,
        message: msg,
        to: from
      });
    }
    setMsg("");
    if (onClose) onClose();
  };

  return (
    <div className={`rounded-2xl shadow-xl w-[420px] max-w-full p-0 border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
      <div className={`flex items-center justify-between px-5 py-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Répondre à {from}</span>
        <div className="flex items-center justify-center">
          <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`} onClick={onClose}>
            <RiCloseLargeLine className="text-xl" />
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-3 px-5 py-4" onSubmit={handleSubmit}>
        <input
          className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`}
          placeholder="Subject"
          value={subject}
          readOnly
        />
        <textarea
          className={`w-full rounded-lg border px-3 py-2 text-sm font-mono min-h-[100px] transition-colors resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`}
          placeholder="Message"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          required
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
          </div>
          <button 
            type="submit" 
            className="text-white font-semibold rounded-lg px-6 py-2 flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors" 
            style={{ backgroundColor: 'var(--selection-bg)' }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--selection-bg)';
            }}
          >
            Envoyer <LuSendHorizontal className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RepondreMail; 