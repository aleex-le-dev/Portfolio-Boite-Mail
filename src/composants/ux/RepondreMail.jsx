// Composant pour afficher le formulaire de réponse à un mail

import React, { useState } from "react";
import { LuSendHorizontal, } from "react-icons/lu";
import { FaPaperclip } from "react-icons/fa6";
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
          <button className={`${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`} onClick={onClose}><RiCloseLargeLine /></button>
        </div>
      </div>
      <form className="flex flex-col gap-3 px-5 py-4" onSubmit={handleSubmit}>
        <input
          className={`w-full rounded border px-3 py-2 text-sm ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
          placeholder="Subject"
          value={subject}
          readOnly
        />
        <textarea
          className={`w-full rounded border px-3 py-2 text-sm font-mono min-h-[100px] ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
          placeholder="Message"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          required
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <button type="button" className={`text-xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}><FaPaperclip /></button>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            Envoyer <LuSendHorizontal className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RepondreMail; 