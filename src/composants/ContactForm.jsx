import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { USER_EMAIL } from './constantes.js';
import { FaPaperclip } from 'react-icons/fa';
import { LuSendHorizontal } from 'react-icons/lu';

const ContactForm = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Créer un formulaire temporaire pour Formspree
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formspree.io/f/mpwlrbyr';
    form.style.display = 'none';

    // Ajouter les champs au formulaire
    const fields = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _replyto: formData.email
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    // Ajouter le formulaire au DOM et le soumettre
    document.body.appendChild(form);
    form.submit();

    // Simuler le succès (Formspree redirige automatiquement)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      document.body.removeChild(form);
      setTimeout(() => { setSubmitStatus(null); onClose(); }, 3000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      {/* Formulaire avec le même style que RepondreMail */}
      <div className={`rounded-2xl shadow-xl w-[420px] max-w-full p-0 border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`} onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-5 py-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Me contacter</span>
          <div className="flex items-center justify-center">
            <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`} onClick={onClose}>
              <MdClose className="text-xl" />
            </button>
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="mx-5 mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Message envoyé avec succès ! Vous recevrez une réponse rapidement.
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mx-5 mt-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Erreur lors de l'envoi. Veuillez réessayer.
            </div>
          </div>
        )}

        <form className="flex flex-col gap-3 px-5 py-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`}
            placeholder="Nom complet"
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`}
            placeholder="Email"
          />
          
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`}
            placeholder="Sujet"
          />
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className={`w-full rounded-lg border px-3 py-2 text-sm font-mono min-h-[100px] transition-colors resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`}
            placeholder="Message"
          />
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <button type="button" className={`text-xl p-2 rounded-lg transition-colors ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                <FaPaperclip />
              </button>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`font-semibold rounded-lg px-6 py-2 flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Envoi...
                </>
              ) : (
                <>
                  Envoyer <LuSendHorizontal className="text-lg" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;