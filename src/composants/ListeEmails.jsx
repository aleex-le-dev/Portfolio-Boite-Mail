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
        emails.map((mail) => {
          let preview = Array.isArray(mail.content) && mail.content.length > 0
            ? mail.content[0].substring(0, 60) + (mail.content[0].length > 60 ? '...' : '')
            : '';
          return (
            <div
              key={mail.id}
              className={`cursor-pointer transition-colors duration-100 w-full ${selectedEmailId === mail.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedEmailId(mail.id)}
            >
              <EmailItem
                avatar={mail.senderAvatar}
                name={mail.sender}
                subject={mail.title}
                preview={preview}
                date={mail.date}
                badge={mail.badge}
                calendar={mail.calendar}
              />
            </div>
          );
        })
      ) : (
        <div className="px-4 py-8 text-center text-gray-400 text-sm">Aucun mail à afficher pour cette catégorie.</div>
      )}
    </section>
  );
};

export default ListeEmails; 