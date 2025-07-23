import React, { useState } from "react";
import EmailItem from "./ux/EmailItem";

// Exemple de structure de mails par catégorie
const MAILS = {
  Work: [
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Wanda Howard",
      subject: "Deck Review",
      preview: "",
      date: "Thu 6:54 PM",
      badge: <span className="inline-block align-middle"><svg className="inline w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H3a1 1 0 1 1 0-2h6V3a1 1 0 0 1 1-1z"/></svg></span>,
      selected: true
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      name: "Allan Munger",
      subject: "Please send customer info",
      preview: <span className="text-green-600 font-semibold">Received 6 days ago. Reply? <span className="text-green-500 font-normal">Dismiss</span></span>,
      date: "Thu 5/5"
    }
  ],
  Creative: [
    {
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      name: "Henry Brill",
      subject: <span className="text-blue-700 font-semibold">Tennis pictures</span>,
      preview: "Hi Katri, Great seeing you at the mat...",
      date: "11:21 AM",
      badge: <span className="bg-blue-500 text-white text-xs rounded-full px-2">2</span>,
      focused: true
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      name: "Lydia Bauer",
      subject: "Team Pictures",
      preview: "Lorem ipsum dolor sit amet,",
      date: "9:20 AM"
    }
  ]
  // ... autres catégories
};

const ListeEmails = ({ selectedCategory }) => {
  // Mails de la boîte de réception uniquement
  const inboxMails = [
    {
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      name: "Cécile Fourcade",
      subject: "Mise à jour de l'organisation",
      preview: "Bonjour à tous, nous sommes ravis de partager les nouv...",
      date: "Jeu. 19:19",
      badge: true
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/37.jpg",
      name: "Wanda Howard",
      subject: "Options de réunion pour jeudi...",
      preview: "Bonjour à tous, que pensez-vous de cette ...",
      date: "Jeu. 19:12",
      badge: true,
      calendar: true
    }
  ];
  return (
    <section className="flex flex-col bg-white h-full overflow-y-auto rounded-2xl">
      <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50 border-b">Hier</div>
      {selectedCategory === "Boîte de réception"
        ? inboxMails.map((mail, i) => <EmailItem key={i} {...mail} />)
        : <div className="px-4 py-8 text-center text-gray-400 text-sm">Aucun mail à afficher pour cette catégorie.</div>
      }
    </section>
  );
};

export default ListeEmails; 