// Composant principal qui structure la boîte mail du portfolio

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import EnTete from "./EnTete";
import BarreLaterale from "./BarreLaterale";
import ListeEmails from "./ListeEmails";
import DetailEmailView from "./ux/DetailEmailView";
import ProjetTemplate from "./ux/ProjetTemplate";
import EmailPopup from "./ux/EmailPopup";
import { PROJECT_CATEGORIES } from "./constantes";
import { IoMdArrowRoundBack } from "react-icons/io";

import { FiTrash2 } from "react-icons/fi";
import { MdArchive } from "react-icons/md";
import { MdLabelImportant, MdInbox } from "react-icons/md";

const BoiteMail = forwardRef(({ darkMode, onToggleDarkMode, onTitleChange }, ref) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Boîte de réception');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Détecter la taille d'écran et ouvrir la sidebar par défaut sur desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    // Appliquer au chargement initial
    handleResize();
    
    // Écouter les changements de taille
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Nettoyage du localStorage pour éviter les doublons de test
    localStorage.removeItem('messageenvoye');
  }, []);

  // Nettoyer le localStorage au chargement pour éviter les problèmes
  useEffect(() => {
    const cleanLocalStorage = () => {
      try {
        const sent = JSON.parse(localStorage.getItem('messageenvoye') || '[]');
        // Supprimer les mails corrompus ou avec des données incorrectes
        const cleaned = sent.filter(mail => mail && mail.id && mail.title && mail.category);
        localStorage.setItem('messageenvoye', JSON.stringify(cleaned));
      } catch {
        localStorage.removeItem('messageenvoye');
      }
    };
    cleanLocalStorage();
  }, []);

  useEffect(() => {
    // Charger d'abord les emails (comme avant)
    const basePath = import.meta.env.DEV ? './src/composants/' : './';
    fetch(`${basePath}email.json`)
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
        } catch{/* ignore */}
        
        // Charger les projets et certifications
        Promise.all([
          fetch(`${basePath}projets.json`).then(res => res.json()).catch(() => []),
          fetch(`${basePath}certification.json`).then(res => res.json()).catch(() => [])
        ]).then(([projetData, certificationData]) => {
          const projetsWithDates = projetData.map(projet => ({
            ...projet,
            date: projet.date || "Aujourd'hui"
          }));
          const certificationsWithDates = certificationData.map(cert => ({
            ...cert,
            date: cert.date || "Aujourd'hui"
          }));
          const allEmails = [...emailsWithDates, ...projetsWithDates, ...certificationsWithDates];
          setEmails(allEmails);
          // Sélectionner automatiquement le premier email de la boîte de réception seulement sur desktop
          if (window.innerWidth >= 768) {
            const firstInboxEmail = allEmails.find(email => email.category === 'Boîte de réception');
            if (firstInboxEmail) {
              setSelectedEmailId(firstInboxEmail.id);
            }
          }
        }).catch(() => {
          console.log('Projets ou certifications non trouvés, chargement des emails seulement');
          const allEmails = [...emailsWithDates];
          setEmails(allEmails);
          // Sélectionner automatiquement le premier email de la boîte de réception seulement sur desktop
          if (window.innerWidth >= 768) {
            const firstInboxEmail = allEmails.find(email => email.category === 'Boîte de réception');
            if (firstInboxEmail) {
              setSelectedEmailId(firstInboxEmail.id);
            }
          }
        });
      })
      .catch(error => {
        console.error('Erreur lors du chargement des emails:', error);
      });
  }, []);

  // Sélectionner automatiquement le premier email quand la catégorie change
  useEffect(() => {
    if (selectedCategory) {
      let categoryEmails = [];
      
      if (selectedCategory === 'Boîte de réception') {
        categoryEmails = emails.filter(mail => mail.category === 'Boîte de réception');
      } else if (selectedCategory === 'Important') {
        categoryEmails = emails.filter(mail => mail.category === 'Important');
      } else if (selectedCategory === 'Archive') {
        categoryEmails = emails.filter(mail => mail.category === 'Archive');
      } else if (selectedCategory === 'Corbeille') {
        categoryEmails = emails.filter(mail => mail.category === 'Corbeille');
      } else if (selectedCategory === 'Messages envoyés') {
        const sentFromLocalStorage = JSON.parse(localStorage.getItem('messageenvoye') || '[]');
        const sentFromJSON = emails.filter(mail => mail.category === 'Messages envoyés');
        // Combiner les deux sources en évitant les doublons par ID
        const allSent = [...sentFromJSON];
        sentFromLocalStorage.forEach(localMail => {
          if (!allSent.find(jsonMail => jsonMail.id === localMail.id)) {
            allSent.push(localMail);
          }
        });
        categoryEmails = allSent;
      } else if (selectedCategory === 'Mes certifications') {
        categoryEmails = emails.filter(mail => mail.category === 'Mes certifications');
      } else {
        categoryEmails = emails.filter(mail => mail.category === selectedCategory);
      }
      
      // Sélectionner le premier email de la catégorie seulement sur desktop
      if (categoryEmails.length > 0 && window.innerWidth >= 768) {
        setSelectedEmailId(categoryEmails[0].id);
      }
    }
  }, [selectedCategory, emails]);

  // Filtrer les emails selon la catégorie sélectionnée
  let filteredEmails = [];
  if (selectedCategory === 'Boîte de réception') {
    filteredEmails = emails.filter(mail => mail.category === 'Boîte de réception');
  } else if (selectedCategory === 'Important') {
    filteredEmails = emails.filter(mail => mail.category === 'Important');
  } else if (selectedCategory === 'Archive') {
    filteredEmails = emails.filter(mail => mail.category === 'Archive');
  } else if (selectedCategory === 'Corbeille') {
    filteredEmails = emails.filter(mail => mail.category === 'Corbeille');
  } else if (selectedCategory === 'Messages envoyés') {
    const sentFromLocalStorage = JSON.parse(localStorage.getItem('messageenvoye') || '[]');
    const sentFromJSON = emails.filter(mail => mail.category === 'Messages envoyés');
    // Combiner les deux sources en évitant les doublons par ID
    const allSent = [...sentFromJSON];
    sentFromLocalStorage.forEach(localMail => {
      if (!allSent.find(jsonMail => jsonMail.id === localMail.id)) {
        allSent.push(localMail);
      }
    });
    filteredEmails = allSent;
  } else if (selectedCategory === 'Mes certifications') {
    filteredEmails = emails.filter(mail => mail.category === 'Mes certifications');
  } else {
    filteredEmails = emails.filter(mail => mail.category === selectedCategory);
  }

  // Calculer les résultats de recherche
  const searchResults = search && search.trim().length >= 3
    ? [...emails, ...(JSON.parse(localStorage.getItem('messageenvoye') || '[]'))]
        .filter(mail => {
          const searchLower = search.trim().toLowerCase();
          
          // Fonction pour vérifier si un texte contient le mot recherché de manière précise
          const containsExactWord = (text) => {
            if (!text) return false;
            const words = text.toLowerCase().split(/\s+/);
            return words.some(word => 
              word === searchLower || 
              word.startsWith(searchLower)
            );
          };
          
          if (mail.title && containsExactWord(mail.title)) return true;
          if (mail.sender && containsExactWord(mail.sender)) return true;
          if (mail.email && containsExactWord(mail.email.split('@')[0])) return true;
          if (Array.isArray(mail.content) && mail.content.some(c => containsExactWord(c))) return true;
          if ((mail.labels || []).some(label => containsExactWord(label))) return true;
          if (mail.image && (mail.alt && containsExactWord(mail.alt))) return true;
          if (mail.image && (mail.title && containsExactWord(mail.title))) return true;
          return false;
        })
        .slice(0, 10)
    : [];
  // Sélectionner le mail courant
  const selectedEmail = filteredEmails.find(e => e.id === selectedEmailId) || filteredEmails[0];

  // Détecter si l'email sélectionné est un projet
  const isProjet = selectedEmail && PROJECT_CATEGORIES.includes(selectedEmail.category);

  // Mettre à jour le titre de la page quand un mail est sélectionné
  useEffect(() => {
    if (selectedEmail && selectedEmail.title) {
      onTitleChange(selectedEmail.title);
    } else {
      onTitleChange("Aleex-le-dev Développeur Web | Lillers & Béthune");
    }
  }, [selectedEmail, onTitleChange]);

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
      id: Date.now(), // Utiliser un timestamp unique pour éviter les conflits
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
          'Archive',
          'Mes certifications',
          'Web',
          'Mobile',
          'Design'
        ].includes(mailToDelete.category)) {
          updated = prev.map(e => e.id === id ? { ...e, category: 'Corbeille' } : e);
        } else {
          // Sinon, suppression complète (ex: déjà en corbeille)
          updated = prev.filter(e => e.id !== id);
        }
      }
      // Si c'est une réponse, supprime aussi l'original de la boîte de réception (même sujet + destinataire)
      if (mailToDelete && mailToDelete.to && mailToDelete.category === 'Messages envoyés') {
        // Vérifier que le mail original existe vraiment avant de le supprimer
        const originalMail = updated.find(e => e.category === 'Boîte de réception' && e.title === mailToDelete.title && e.email === mailToDelete.to);
        if (originalMail) {
          updated = updated.filter(e => !(e.category === 'Boîte de réception' && e.title === mailToDelete.title && e.email === mailToDelete.to));
        }
      }
      
      // Debug: afficher tous les mails avec le même titre
      if (mailToDelete && mailToDelete.category === 'Messages envoyés') {
        // Supprimer le mail de la corbeille
        updated = updated.filter(e => e.id !== id);
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

  // Déplace tous les emails d'un sous-libellé vers la corbeille
  const handleDeleteSubLabel = (subLabel) => {
    setEmails(prev => prev.map(e => e.category === subLabel ? { ...e, category: 'Corbeille' } : e));
    let sent = [];
    try {
      sent = JSON.parse(localStorage.getItem('messageenvoye')) || [];
    } catch {/* ignore */}
    sent = sent.map(e => e.category === subLabel ? { ...e, category: 'Corbeille' } : e);
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
    <div className={`flex flex-col h-screen ${darkMode ? '' : 'bg-white'}`} style={darkMode ? { backgroundColor: 'var(--dark-primary-bg)' } : { backgroundColor: 'var(--light-primary-bg)' }}>
                        <EnTete
                    onToggleSidebar={() => setSidebarOpen((v) => !v)}
                    search={search}
                    onSearchChange={e => setSearch(e.target.value)}
                    searchResults={searchResults}
                    onSelectMail={mail => {
                      setSelectedCategory(mail.category);
                      setTimeout(() => setSelectedEmailId(mail.id), 0);
                      setSearch("");
                    }}
                    onSelectCategory={category => {
                      setSelectedCategory(category);
                      setSelectedEmailId(null);
                      setSearch("");
                      // Ne fermer la sidebar que sur mobile
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                    darkMode={darkMode}
                    onToggleDarkMode={onToggleDarkMode}
                    sidebarOpen={sidebarOpen}
                  />
      
      {/* Sidebar mobile - overlay */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-out ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay sombre */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: 'var(--dark-primary-bg)', opacity: 0.5 }} onClick={() => setSidebarOpen(false)}></div>
        {/* Sidebar */}
        <div className={`absolute top-0 left-0 h-full shadow-lg max-w-[280px] w-full transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={darkMode ? { backgroundColor: 'var(--dark-primary-bg)' } : { backgroundColor: 'var(--light-primary-bg)' }}>
          <div className="p-4">
            <BarreLaterale 
              selectedCategory={selectedCategory} 
              setSelectedCategory={(category) => {
                setSelectedCategory(category);
                setSelectedEmailId(null);
              }} 
              emails={emails} 
              onDeleteSubLabel={handleDeleteSubLabel} 
              filteredEmails={filteredEmails}
              search={search}
              onSearchChange={e => setSearch(e.target.value)}
              searchResults={searchResults}
              onSelectMail={mail => {
                setSelectedCategory(mail.category);
                setTimeout(() => setSelectedEmailId(mail.id), 0);
                setSearch("");
                setSidebarOpen(false);
              }}
              onCloseSidebar={() => setSidebarOpen(false)}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop - cachée sur mobile */}
        {sidebarOpen && (
          <div className="hidden md:block">
            <BarreLaterale selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} emails={emails} onCloseSidebar={() => setSidebarOpen(false)} darkMode={darkMode} />
          </div>
        )}
        
        {/* Zone principale - responsive */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden md:overflow-visible h-full md:h-auto">
          {/* Liste des emails - visible sur mobile sauf si détail ouvert */}
          <div className={`${selectedEmailId ? 'hidden md:block' : 'block'} ${sidebarOpen ? 'w-full md:w-[30%]' : 'w-full'} mx-0.5 min-w-0 md:min-w-[280px] shadow-lg rounded-2xl h-full md:h-auto overflow-y-auto`}> 
            <div className={`h-full rounded-2xl overflow-hidden ${darkMode ? '' : 'bg-white'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-primary-bg)' }}>
              <ListeEmails
                selectedCategory={selectedCategory}
                emails={filteredEmails}
                selectedEmailId={selectedEmailId}
                setSelectedEmailId={setSelectedEmailId}
                darkMode={darkMode}
              />
            </div>
          </div>
          
          {/* Détail email - pleine largeur sur mobile, 70% sur desktop */}
          <div className={`${selectedEmailId ? 'block' : 'hidden md:block'} ${sidebarOpen ? 'w-full md:w-[70%]' : 'w-full'} mx-0.5 shadow-lg rounded-2xl h-full md:h-screen overflow-y-auto`}>
            <div className={`h-full rounded-2xl overflow-hidden ${darkMode ? '' : 'bg-white'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-primary-bg)' }}>
              {filteredEmails.length > 0 && selectedEmail ? (
                <>
                  {/* Barre d'action au-dessus du détail */}
                  <div className={`flex items-center justify-between px-6 border-b sticky top-0 z-10 text-xs h-12 min-h-12 rounded-tr-2xl w-full ${darkMode ? 'text-gray-300 border-white' : 'text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'white' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'black' }}>
                    <div className="flex items-center gap-2">
                      {/* Bouton retour sur mobile */}
                      <button 
                        className={`md:hidden p-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500'}`}
                        onClick={() => setSelectedEmailId(null)}
                        aria-label="Retour à la liste"
                      >
                        <IoMdArrowRoundBack className="text-2xl" />
                      </button>
                      {filteredEmails.length > 1 && (
                        <>
                          <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`}
                            style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }}
                            onClick={() => {
                              const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
                              if (idx > 0) setSelectedEmailId(filteredEmails[idx - 1].id);
                            }}
                            disabled={filteredEmails.findIndex(e => e.id === selectedEmailId) === 0}
                          >
                            <svg className="text-xl" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                          </button>
                          <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`}
                            style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }}
                            onClick={() => {
                              const idx = filteredEmails.findIndex(e => e.id === selectedEmailId);
                              if (idx < filteredEmails.length - 1) setSelectedEmailId(filteredEmails[idx + 1].id);
                            }}
                            disabled={filteredEmails.findIndex(e => e.id === selectedEmailId) === filteredEmails.length - 1}
                          >
                            <svg className="text-xl" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                          </button>
                        </>
                      )}
                      {selectedCategory === 'Boîte de réception' && (
                        <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }} onClick={() => handleImportant(selectedEmailId)} title="Marquer comme important"><MdLabelImportant className="text-xl" /></button>
                      )}
                      {(selectedCategory === 'Important' || selectedCategory === 'Corbeille' || selectedCategory === 'Archive') && (
                        <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }} onClick={() => handleToInbox(selectedEmailId)} title="Déplacer vers la boîte de réception"><MdInbox className="text-xl" /></button>
                      )}
                      {selectedCategory === 'Messages envoyés' && (
                        <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }} onClick={() => handleImportant(selectedEmail?.id || selectedEmailId)} title="Marquer comme important"><MdLabelImportant className="text-xl" /></button>
                      )}
                      {selectedCategory !== 'Archive' && selectedCategory !== 'Messages envoyés' && (
                        <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }} onClick={() => handleArchive(selectedEmailId)} title="Archiver"><MdArchive className="text-xl" /></button>
                      )}
                      {selectedCategory === 'Messages envoyés' && (
                        <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }} onClick={() => handleArchive(selectedEmail?.id || selectedEmailId)} title="Archiver"><MdArchive className="text-xl" /></button>
                      )}
                      {selectedCategory !== 'Corbeille' && (
                        <button className={`p-0.5 rounded ${darkMode ? 'text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)' } : { backgroundColor: 'var(--light-secondary-bg)' }} onClick={() => {
                          handleTrash(selectedEmail?.id || selectedEmailId);
                        }} title="Mettre à la corbeille"><FiTrash2 className="text-xl" /></button>
                      )}
                    </div>
                    <div className={`font-bold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {(() => {
                        const index = filteredEmails.findIndex(e => e.id === selectedEmailId);
                        return index !== -1 ? `${index + 1} / ${filteredEmails.length}` : `1 / ${filteredEmails.length}`;
                      })()}
                    </div>
                  </div>
                  {isProjet ? (
                    <div className="w-full h-full overflow-y-auto">
                      <ProjetTemplate 
                        projet={selectedEmail} 
                        onClose={() => {}} 
                        embedded={true}
                        darkMode={darkMode}
                      />
                    </div>
                  ) : (
                    <DetailEmailView 
                      {...selectedEmail} 
                      onSendMail={handleSendMail} 
                      darkMode={darkMode}
                      emails={emails}
                      selectedEmailId={selectedEmailId}
                      onSelectEmail={setSelectedEmailId}
                    />
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-400 text-lg">Vous n'avez sélectionné aucune conversation.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* TEMPORAIRE : Popup email pour le développement */}
      <EmailPopup 
        isVisible={true}
        onClose={() => {}}
        darkMode={darkMode}
      />
    </div>
  );
});

export default BoiteMail;