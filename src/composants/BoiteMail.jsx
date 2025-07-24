// Composant principal qui structure la boîte mail du portfolio

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmailView from "./ux/DetailEmailView";
import { FiTrash2 } from "react-icons/fi";
import { MdArchive } from "react-icons/md";
import { MdLabelImportant, MdInbox } from "react-icons/md";

const BoiteMail = forwardRef((props, ref) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Boîte de réception");
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  useEffect(() => {
    fetch("./src/composants/email.json")
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        const emailsWithDates = data.map(email => {
          if (email.id === 1) {
            return { ...email, date: "Aujourd'hui" };
          } else {
            const daysAgo = Math.floor(Math.random() * 5) + 1;
            const date = new Date(today);
            date.setDate(today.getDate() - daysAgo);
            return { ...email, date: date.toLocaleDateString('fr-FR') };
          }
        });
        // Ajout des messages envoyés depuis localStorage
        let sent = [];
        try {
          sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
        } catch {/* ignore */}
        setEmails([...sent, ...emailsWithDates]);
      });
  }, []);

  // Filtrer les emails selon la catégorie sélectionnée
  const todayStr = new Date().toLocaleDateString('fr-FR');
  let filteredEmails = [];
  if (selectedCategory === 'Messages envoyés') {
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    filteredEmails = sent.map(e => e.todayDate ? { ...e, date: todayStr } : e);
  } else {
    filteredEmails = emails.filter(e => e.category === selectedCategory).map(e =>
      e.todayDate ? { ...e, date: todayStr } : e
    );
  }
  // Sélectionner le mail courant
  const selectedEmail = filteredEmails.find(e => e.id === selectedEmailId) || filteredEmails[0];

  // Si la catégorie change, reset la sélection
  useEffect(() => {
    setSelectedEmailId(filteredEmails[0]?.id || null);
  }, [selectedCategory, emails]);

  // Fonction pour ajouter un mail envoyé
  const handleSendMail = ({ subject, message, to }) => {
    // Chercher le mail original pour récupérer son contenu
    let original = emails.find(e => e.title === subject && e.email === to);
    let originalContent = original && original.content ? original.content : [];
    let originalSummary = original && original.summary ? original.summary : "";
    let originalImage = original && original.image ? original.image : null;
    let originalSender = original && original.sender ? original.sender : "";
    let originalSenderAvatar = original && original.senderAvatar ? original.senderAvatar : "";
    let originalEmail = original && original.email ? original.email : "";
    // Ne pas dupliquer la réponse si elle est déjà dans le contenu
    if (originalContent.length > 0 && originalContent[originalContent.length - 1] === message) {
      originalContent = originalContent.slice(0, -1);
    }
    const newMail = {
      id: emails.length > 0 ? Math.max(...emails.map(e => e.id)) + 1 : 1,
      category: "Messages envoyés",
      title: subject,
      sender: originalSender,
      email: originalEmail,
      senderAvatar: originalSenderAvatar,
      date: new Date().toLocaleDateString('fr-FR'),
      summary: originalSummary,
      image: originalImage,
      content: [...originalContent, message],
      to: to
    };
    setEmails([newMail, ...emails]);
    // Persistance dans localStorage
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    sent.unshift(newMail);
    localStorage.setItem('messageenvoye', JSON.stringify(sent));
  };

  // Fonction pour archiver un mail
  const handleArchive = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, category: 'Archive' } : e));
    // Archive aussi dans localStorage si c'est un message envoyé
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    if (sent.find(e => e.id === id)) {
      sent = sent.map(e => e.id === id ? { ...e, category: 'Archive' } : e);
      localStorage.setItem('messageenvoye', JSON.stringify(sent));
    }
  };

  // Fonction pour marquer un mail comme important
  const handleImportant = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, category: 'Important' } : e));
    // Important aussi dans localStorage si c'est un message envoyé
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    if (sent.find(e => e.id === id)) {
      sent = sent.map(e => e.id === id ? { ...e, category: 'Important' } : e);
      localStorage.setItem('messageenvoye', JSON.stringify(sent));
    }
  };

  // Fonction pour remettre un mail dans la boîte de réception
  const handleToInbox = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, category: 'Boîte de réception' } : e));
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    if (sent.find(e => e.id === id)) {
      sent = sent.map(e => e.id === id ? { ...e, category: 'Boîte de réception' } : e);
      localStorage.setItem('messageenvoye', JSON.stringify(sent));
    }
  };

  // Fonction pour mettre un mail à la corbeille
  const handleTrash = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, category: 'Corbeille' } : e));
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    if (sent.find(e => e.id === id)) {
      sent = sent.map(e => e.id === id ? { ...e, category: 'Corbeille' } : e);
      localStorage.setItem('messageenvoye', JSON.stringify(sent));
    }
  };

  useImperativeHandle(ref, () => ({
    selectInfoMail: () => {
      setSelectedCategory('Important');
      setTimeout(() => {
        setSelectedEmailId(1000);
      }, 0);
    }
  }));

  return (
    <div className="flex flex-col h-screen bg-white  ">
      <EnTete onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <BarreLaterale selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        <div className="w-[30%] mx-0.5 min-w-[280px] shadow-lg rounded-2xl">
          <div className="h-full bg-white rounded-2xl overflow-hidden">
            <ListeEmails
              selectedCategory={selectedCategory}
              emails={filteredEmails}
              selectedEmailId={selectedEmailId}
              setSelectedEmailId={setSelectedEmailId}
            />
          </div>
        </div>
        <div className="w-[70%] mx-0.5 shadow-lg rounded-2xl">
          <div className="h-full bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center">
            {filteredEmails.length > 0 && selectedEmail ? (
              <>
                {/* Barre d'action au-dessus du détail */}
                <div className="flex items-center justify-between px-6 border-b bg-gray-50 sticky top-0 z-10 text-xs text-gray-500 h-8 min-h-8 rounded-tr-2xl w-full">
                  <div className="flex items-center gap-2">
                    <button className="p-0.5 rounded hover:bg-gray-200"
                      onClick={() => {
                        const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
                        if (idx > 0) setSelectedEmailId(filteredEmails[idx - 1].id);
                      }}
                      disabled={filteredEmails.findIndex(e => e.id === selectedEmailId) === 0}
                    >
                      <svg className="text-sm" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button className="p-0.5 rounded hover:bg-gray-200"
                      onClick={() => {
                        const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
                        if (idx < filteredEmails.length - 1) setSelectedEmailId(filteredEmails[idx + 1].id);
                      }}
                      disabled={filteredEmails.findIndex(e => e.id === selectedEmailId) === filteredEmails.length - 1}
                    >
                      <svg className="text-sm" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                    </button>
                    {selectedCategory === 'Boîte de réception' && (
                      <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleImportant(selectedEmailId)} title="Marquer comme important"><MdLabelImportant className="text-base" /></button>
                    )}
                    {(selectedCategory === 'Important' || selectedCategory === 'Corbeille' || selectedCategory === 'Archive') && (
                      <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleToInbox(selectedEmailId)} title="Déplacer vers la boîte de réception"><MdInbox className="text-base" /></button>
                    )}
                    {selectedCategory !== 'Archive' && selectedCategory !== 'Messages envoyés' && (
                      <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleArchive(selectedEmailId)} title="Archiver"><MdArchive className="text-base" /></button>
                    )}
                    {selectedCategory !== 'Corbeille' && (
                      <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleTrash(selectedEmailId)} title="Mettre à la corbeille"><FiTrash2 className="text-base" /></button>
                    )}
                  </div>
                  <div className="font-semibold">
                    {filteredEmails.findIndex(e => e.id === selectedEmailId) + 1} / {filteredEmails.length}
                  </div>
                </div>
                <DetailEmailView {...selectedEmail} onSendMail={handleSendMail} />
              </>
            ) : (
              <div className="text-gray-400 text-lg">Vous n'avez sélectionné aucune conversation.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BoiteMail; 