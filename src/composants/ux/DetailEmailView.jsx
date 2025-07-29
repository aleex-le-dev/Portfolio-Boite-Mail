import React, { useState } from "react";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import RepondreMail from "./RepondreMail";

const DetailEmailView = ({
  title = "Titre du mail",
  sender = "Nom Expéditeur",
  senderAvatar = "https://randomuser.me/api/portraits/men/32.jpg",
  date = "01 Janv. 2024",
  image,
  content = "Contenu détaillé du mail...",
  email = "email@example.com", 
  onSendMail,
  category,
  id,
  to,
  darkMode,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fermer le formulaire au clic sur overlay ou croix
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("repondre-mail-overlay")) setShowReply(false);
  };

  if (category === 'Important' && id === 1000) {
    return (
      <div className={`w-full h-full flex flex-col rounded-2xl overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-10 pl-8 flex flex-col">
          <h1 className="text-2xl font-bold mb-2 text-left w-full">{title}</h1>
          <div className="flex items-start gap-3 mb-4 w-full">
            <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sender}</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
              </div>
            </div>
          </div>
          <div className=" border-blue-200 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Confidentialité & cookies</h2>
            <p className="mb-3 text-gray-800">Ce site respecte votre vie privée et utilise des cookies et le stockage local pour améliorer votre expérience utilisateur et analyser le trafic.</p>
            
            <h3 className="font-semibold mt-6 mb-1">Cookies et analyse du trafic</h3>
            <p className="mb-3 text-gray-700">Ce site utilise Google Tag Manager (GTM) pour analyser le trafic et améliorer l'expérience utilisateur. GTM peut placer des cookies sur votre appareil pour collecter des informations anonymes sur votre utilisation du site.</p>
            
            <h3 className="font-semibold mt-6 mb-1">Qu'est-ce que le stockage local&nbsp;?</h3>
            <p className="mb-3 text-gray-700">Le stockage local (localStorage) permet de conserver certaines informations sur votre appareil, comme vos préférences d'affichage. Ces données ne sont jamais transmises à un serveur ou à des tiers.</p>
            
            <h3 className="font-semibold mt-6 mb-1">Utilisation sur ce site</h3>
            <ul className="list-disc ml-6 mb-3 text-gray-700">
              <li>Analyse anonyme du trafic via Google Tag Manager</li>
              <li>Conservation de vos préférences d'affichage (acceptation des cookies)</li>
              <li>Amélioration de l'expérience utilisateur</li>
            </ul>
            
            <h3 className="font-semibold mt-6 mb-1">Aucune exploitation commerciale</h3>
            <p className="mb-3 text-gray-700">Les données collectées ne sont utilisées qu'à des fins d'analyse et d'amélioration du site. Aucune donnée n'est utilisée à des fins publicitaires, de profilage ou de suivi personnalisé.</p>
            
            <h3 className="font-semibold mt-6 mb-1">Vos droits</h3>
            <p className="mb-1 text-gray-700">Vous pouvez à tout moment effacer les cookies et données stockées via les paramètres de votre navigateur.</p>
            <p className="text-gray-700">Pour toute question, contactez-moi à <a href="mailto:alexandre.janacek@gmail.com" className="underline text-blue-700 hover:text-blue-800 transition-colors">alexandre.janacek@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    );
  }
  if (category === 'Important' && id === 1001) {
    return (
      <div className={`w-full h-full flex flex-col rounded-2xl overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-10 pl-8 flex flex-col">
          <h1 className="text-2xl font-bold mb-2 text-left w-full">Mentions légales du site</h1>
          <p className="mb-3 text-gray-800">Ce site respecte votre vie privée et utilise des cookies et le stockage local pour améliorer votre expérience utilisateur et analyser le trafic.</p>

          <div className="flex items-start gap-3 mb-4 w-full">
            <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col w-full">
            
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-gray-900">{sender}</span>
                <span className="text-xs text-gray-500">{date}</span>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Mentions légales du site</h2>
          <div className="mb-2">
            <strong>Éditeur :</strong> Aleex Le Dev
          </div>
          <div className="mb-2">
            <strong>Contact :</strong> <a href="mailto:alexandre.janacek@gmail.com" className="underline text-blue-700">alexandre.janacek@gmail.com</a>
          </div>
          <div className="mb-2">
            <strong>Directeur de la publication :</strong> Aleex Le Dev
          </div>
          <div className="mb-2">
            <strong>Hébergeur :</strong> O2SWITCH (<a href="https://www.o2switch.fr/contact/" className="underline text-blue-700">contact</a>)
          </div>
          <div className="mt-6 text-gray-700">Ce site est un portfolio personnel. Pour toute question ou demande, contactez-moi à l'adresse ci-dessus.</div>
        </div>
      </div>
    );
  }
  return (
    <div className={`w-full h-full flex flex-col rounded-2xl overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Corps du mail */}
      <style>{`
        .mail-content a { color: #2563eb; text-decoration: underline; transition: color 0.2s; }
        .mail-content a:hover { color: #1d4ed8; text-decoration: underline; }
      `}</style>
      <div className={`px-10 pl-8 flex flex-col ${category === 'Messages envoyés' ? '' : 'items-center'}`}>
        {category !== 'Messages envoyés' && (
          <>
            <h1 className={`text-2xl font-bold mb-2 text-left w-full ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
            <div className="flex items-start gap-3 mb-4 w-full">
              <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sender}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
                </div>
                {image && <img src={image} alt="illustration" className="rounded-xl mb-4 object-cover max-w-[120px] max-h-[80px] cursor-pointer" onClick={() => setPreviewImage(image)} />}
                <div className="mt-5 mail-content">
                  {Array.isArray(content)
                    ? content.filter(c => !/<img/i.test(c)).map((c, i) =>
                        c === ""
                          ? <div key={i} className="h-4"></div>
                          : /<[^>]*>/i.test(c)
                            ? <div key={i} className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`} dangerouslySetInnerHTML={{__html: c}} />
                            : <div key={i} className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{c}</div>
                      )
                    : (/<[^>]*>/i.test(content)
                        ? <div className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`} dangerouslySetInnerHTML={{__html: content}} />
                        : <div className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{content}</div>
                      )}
                  {Array.isArray(content) && /<img/i.test(content[content.length-1]) && (
                    <div className="w-full flex justify-center mt-6" dangerouslySetInnerHTML={{__html: content[content.length-1].replace(/<br\s*\/>Mon CV :/i, '')}} />
                  )}
                </div>
                {category === 'Mes certifications' && image && (
                  <img src={image} alt="certification" className="rounded-xl mt-8 mb-4 object-contain max-w-[420px] w-full shadow-lg border border-gray-200 cursor-pointer" onClick={() => setPreviewImage(image)} />
                )}
              </div>
            </div>
          </>
        )}
        {category === 'Messages envoyés' && !to && (
          <>
            <h1 className={`text-2xl font-bold mb-2 text-left w-full ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
            <div className="flex items-start gap-3 mb-4 w-full">
              <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sender}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
                </div>
                <div className="mt-5 mail-content">
                  {Array.isArray(content)
                    ? content.filter(c => !/<img/i.test(c)).map((c, i) =>
                        c === ""
                          ? <div key={i} className="h-4"></div>
                          : /<[^>]*>/i.test(c)
                            ? <div key={i} className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`} dangerouslySetInnerHTML={{__html: c}} />
                            : <div key={i} className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{c}</div>
                      )
                    : (/<[^>]*>/i.test(content)
                        ? <div className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`} dangerouslySetInnerHTML={{__html: content}} />
                        : <div className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{content}</div>
                      )}
                  {Array.isArray(content) && /<img/i.test(content[content.length-1]) && (
                    <div className="w-full flex justify-center mt-6" dangerouslySetInnerHTML={{__html: content[content.length-1].replace(/<br\s*\/>Mon CV :/i, '')}} />
                  )}
                  {/* Affiche l'image props.image à la fin si c'est la candidature OpenAI */}
                  {title && title.includes('OpenAI') && image && (
                    <div className="w-full flex justify-center mt-6">
                      <img
                        src={image}
                        alt="CValex"
                        title="CV Alexandre Janacek"
                        className="rounded-xl object-contain w-full max-w-none shadow-lg border border-gray-200 cursor-pointer"
                        style={{maxWidth: '100%'}}
                        onClick={() => setPreviewImage(image)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {category === 'Messages envoyés' && to && Array.isArray(content) && content.length > 1 && (
          <div className={`text-base w-full ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            <h1 className={`text-2xl font-bold mb-2 text-left w-full ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
            <div className="flex items-start gap-3 mb-2">
              {senderAvatar &&
                <img src={senderAvatar} alt={sender} className="w-10 h-10 rounded-full object-cover border border-gray-300" />
              }
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sender}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
                </div>
                <div className="mt-5 mail-content">
                  {content.slice(0, -1).map((c, i) =>
                    c === ""
                      ? <div key={i} className="h-4"></div>
                      : /<[^>]*>/i.test(c)
                        ? <div key={i} className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`} dangerouslySetInnerHTML={{__html: c}} />
                        : <div key={i} className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{c}</div>
                  )}
                </div>
              </div>
            </div>
            <hr className={`my-4 border-t-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`} />
            <div className="flex items-start gap-3 mt-4">
              <img src="https://media.licdn.com/dms/image/v2/D4E03AQHsjLWbL7ML0g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672497184613?e=2147483647&v=beta&t=pHUPGHFTtXxg-xkAMXqpxoFItxeqD6u3jm-0ZlYUm0o" alt="alexandre.janacek@gmail.com" className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 mt-1" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Aleex Le Dev</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`text-base whitespace-pre-line mt-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{content[content.length - 1]}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Barre d'actions en bas */}
      {category !== 'Archive' && category !== 'Corbeille' && category !== 'Design' && (
        <div className="flex gap-6 px-10 mt-6 mb-0 ml-11">
          <button
            className={`flex items-center gap-2 border rounded-full px-5 py-2 text-base font-semibold transition mt-0 mb-0 ${darkMode ? 'border-gray-500 text-gray-300 hover:bg-gray-700' : 'border-gray-400 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setShowReply(true)}
          >
            Répondre
            <FiCornerUpRight className="text-xl" />
          </button>
        </div>
      )}
      {showReply && (
        <div className="repondre-mail-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/10" onClick={handleOverlayClick}>
          <RepondreMail onClose={() => setShowReply(false)} from={email} subject={title} onSendMail={onSendMail} darkMode={darkMode} />
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 w-12 h-12 bg-white/90 text-gray-800 rounded-full flex items-center justify-center text-2xl font-bold hover:bg-white transition-colors"
              onClick={() => setPreviewImage(null)}
              aria-label="Fermer l'aperçu"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailEmailView; 