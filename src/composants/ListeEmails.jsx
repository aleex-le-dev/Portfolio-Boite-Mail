import React from "react";
import EmailItem from "./ux/EmailItem";

const ListeEmails = ({ emails = [], selectedEmailId, setSelectedEmailId, selectedCategory, darkMode }) => {
  return (
    <section className={`h-full ${darkMode ? 'bg-[#0c0c0c]' : 'bg-white'}`}>
      {emails.length > 0 && (
        <div className={`flex justify-center items-center text-center px-4 py-2 h-12 min-h-12 text-sm md:text-base font-bold border-b rounded-tl-2xl ${darkMode ? 'text-gray-300 bg-[#0c0c0c]' : 'text-gray-700 bg-gray-50'}`}>
          {selectedCategory}
        </div>
      )}
      {emails.length > 0 ? (
        emails.map((mail) => {
          let preview = '';
          if (Array.isArray(mail.content) && mail.content.length > 0) {
            if (selectedCategory === 'Boîte de réception' && mail.content.length >= 3) {
              // Pour la boîte de réception, on affiche la 3e ligne (index 2)
              preview = mail.content[2].replace(/<br\s*\/?>/gi, ' ').substring(0, 80) + (mail.content[2].replace(/<br\s*\/?>/gi, ' ').length > 80 ? '...' : '');
            } else {
              // Pour les autres catégories, on garde la première ligne
              preview = mail.content[0].replace(/<br\s*\/?>/gi, ' ').substring(0, 80) + (mail.content[0].replace(/<br\s*\/?>/gi, ' ').length > 80 ? '...' : '');
            }
          }
          return (
            <div
              key={mail.id}
              className={`cursor-pointer transition-colors duration-100 w-full ${selectedEmailId === mail.id ? (darkMode ? 'bg-blue-900' : 'bg-blue-100') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50')}`}
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
                image={mail.image}
                darkMode={darkMode}
              />
            </div>
          );
        })
      ) : (
        <div className={`px-4 py-8 text-center text-xs md:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Aucun mail à afficher pour cette catégorie.</div>
      )}
    </section>
  );
};

export default ListeEmails; 