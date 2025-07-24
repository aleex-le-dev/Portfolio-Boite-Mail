import React from "react";
import EmailItem from "./ux/EmailItem";

const ListeEmails = ({ emails = [], selectedEmailId, setSelectedEmailId }) => {
  return (
    <section className="flex flex-col bg-white h-full overflow-y-auto rounded-2xl">
      {emails.length > 0 && (
        <div className="flex justify-center items-center text-center px-4 py-0 h-8 min-h-8 text-xs text-gray-500 font-semibold bg-gray-50 border-b rounded-tl-2xl">
          Aujourd'hui
        </div>
      )}
      {emails.length > 0 ? (
        emails.map((mail) => (
          <div
            key={mail.id}
            className={`cursor-pointer ${selectedEmailId === mail.id ? 'bg-blue-50' : ''}`}
            onClick={() => setSelectedEmailId(mail.id)}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <img src={mail.senderAvatar} alt={mail.sender} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 truncate">{mail.sender}</span>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{mail.date}</span>
                </div>
                <div className="text-gray-800 truncate -mt-0.5 font-medium">{mail.title}</div>
                <div className="text-gray-600 text-sm truncate">{mail.summary.slice(0, 60)}...</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-4 py-8 text-center text-gray-400 text-sm">Aucun mail à afficher pour cette catégorie.</div>
      )}
    </section>
  );
};

export default ListeEmails; 