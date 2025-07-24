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
    // Nettoyage du localStorage pour éviter les doublons de test
    localStorage.removeItem('messageenvoye');
  }, []);

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
  const [search, setSearch] = useState("");
  let filteredEmails = [];
  if (selectedCategory === 'Corbeille') {
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    const jsonTrash = emails.filter(e => e.category === 'Corbeille');
    const allTrash = [...sent.filter(e => e.category === 'Corbeille'), ...jsonTrash.filter(js => !sent.find(s => s.id === js.id))];
    filteredEmails = allTrash.map(e => e.todayDate ? { ...e, date: todayStr } : e);
  } else if (selectedCategory === 'Messages envoyés') {
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    // Affiche tous les mails (JSON + localStorage)
    const jsonSent = emails.filter(e => e.category === 'Messages envoyés');
    const allSent = [...sent, ...jsonSent.filter(js => !sent.find(s => s.id === js.id))];
    filteredEmails = allSent.map(e => e.todayDate ? { ...e, date: todayStr } : e);
    console.log('filteredEmails:', filteredEmails);
    console.log('compteur affiché:', (emails || []).filter(e => e.category === 'Messages envoyés' && !e.to).length);
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
    setEmails(prev => {
      let updated = prev;
      const mailToDelete = prev.find(e => e.id === id);
      if (mailToDelete) {
        // Si le mail est en boîte de réception, messages envoyés, important ou archive, on le déplace dans la corbeille
        if ([
          'Boîte de réception',
          'Messages envoyés',
          'Important',
          'Archive'
        ].includes(mailToDelete.category)) {
          updated = prev.map(e => e.id === id ? { ...e, category: 'Corbeille' } : e);
        } else {
          // Sinon, suppression complète (ex: déjà en corbeille)
          updated = prev.filter(e => e.id !== id);
        }
      }
      // Si c'est une réponse, supprime aussi l'original de la boîte de réception (même sujet + destinataire)
      if (mailToDelete && mailToDelete.to) {
        updated = updated.filter(e => !(e.category === 'Boîte de réception' && e.title === mailToDelete.title && e.email === mailToDelete.to));
      }
      if (selectedCategory === 'Messages envoyés') {
        const next = updated.filter(e => e.category === 'Messages envoyés');
        setSelectedEmailId(next[0]?.id || null);
      }
      return updated;
    });
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    // Déplace aussi dans la corbeille côté localStorage
    sent = sent.map(e => e.id === id ? { ...e, category: 'Corbeille' } : e);
    localStorage.setItem('messageenvoye', JSON.stringify(sent));
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
      <EnTete
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        search={search}
        onSearchChange={e => setSearch(e.target.value)}
        searchResults={search && search.trim().length >= 3
          ? [...emails, ...(JSON.parse(localStorage.getItem('messageenvoye') || '[]'))]
              .filter(mail => {
                const searchLower = search.trim().toLowerCase();
                if (mail.title && mail.title.toLowerCase().includes(searchLower)) return true;
                if (mail.sender && mail.sender.toLowerCase().includes(searchLower)) return true;
                if (mail.email && mail.email.toLowerCase().includes(searchLower)) return true;
                if (Array.isArray(mail.content) && mail.content.some(c => c.toLowerCase().includes(searchLower))) return true;
                if ((mail.labels || []).some(label => label.toLowerCase().includes(searchLower))) return true;
                // Recherche sur le alt ou title d'image (ex: CValex)
                if (mail.image && (mail.alt && mail.alt.toLowerCase().includes(searchLower))) return true;
                if (mail.image && (mail.title && mail.title.toLowerCase().includes(searchLower))) return true;
                return false;
              })
              .slice(0, 10)
          : []}
        onSelectMail={mail => {
          setSelectedCategory(mail.category);
          setTimeout(() => setSelectedEmailId(mail.id), 0);
          setSearch("");
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <BarreLaterale selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} emails={emails} filteredEmails={filteredEmails} />}
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
            {search && search.trim().length >= 3 ? null : (
              filteredEmails.length > 0 && selectedEmail ? (
                <>
                  {/* Barre d'action au-dessus du détail */}
                  <div className="flex items-center justify-between px-6 border-b bg-gray-50 sticky top-0 z-10 text-xs text-gray-500 h-12 min-h-12 rounded-tr-2xl w-full">
                    <div className="flex items-center gap-2">
                      <button className="p-0.5 rounded hover:bg-gray-200"
                        onClick={() => {
                          const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
                          if (idx > 0) setSelectedEmailId(filteredEmails[idx - 1].id);
                        }}
                        disabled={filteredEmails.findIndex(e => e.id === selectedEmailId) === 0}
                      >
                        <svg className="text-xl" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <button className="p-0.5 rounded hover:bg-gray-200"
                        onClick={() => {
                          const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
                          if (idx < filteredEmails.length - 1) setSelectedEmailId(filteredEmails[idx + 1].id);
                        }}
                        disabled={filteredEmails.findIndex(e => e.id === selectedEmailId) === filteredEmails.length - 1}
                      >
                        <svg className="text-xl" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                      </button>
                      {selectedCategory === 'Boîte de réception' && (
                        <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleImportant(selectedEmailId)} title="Marquer comme important"><MdLabelImportant className="text-xl" /></button>
                      )}
                      {(selectedCategory === 'Important' || selectedCategory === 'Corbeille' || selectedCategory === 'Archive') && (
                        <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleToInbox(selectedEmailId)} title="Déplacer vers la boîte de réception"><MdInbox className="text-xl" /></button>
                      )}
                      {selectedCategory !== 'Archive' && selectedCategory !== 'Messages envoyés' && (
                        <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleArchive(selectedEmailId)} title="Archiver"><MdArchive className="text-xl" /></button>
                      )}
                      {selectedCategory !== 'Corbeille' && (
                        <button className="p-0.5 rounded hover:bg-gray-200" onClick={() => handleTrash(selectedEmailId)} title="Mettre à la corbeille"><FiTrash2 className="text-xl" /></button>
                      )}
                    </div>
                    <div className="font-bold text-sm">
                      {filteredEmails.findIndex(e => e.id === selectedEmailId) + 1} / {filteredEmails.length}
                    </div>
                  </div>
                  <DetailEmailView {...selectedEmail} onSendMail={handleSendMail} />
                </>
              ) : (
                <div className="text-gray-400 text-lg">Vous n'avez sélectionné aucune conversation.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BoiteMail; 