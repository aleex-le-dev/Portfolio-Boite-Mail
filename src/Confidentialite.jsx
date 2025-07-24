import React from "react";

// Page d'information sur la confidentialité et le stockage local
// À lier dans la bannière cookie ou dans les mentions légales
const Confidentialite = () => (
  <div className="max-w-2xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-6">Confidentialité & Stockage local</h1>
    <p className="mb-4">Ce site respecte votre vie privée et n'utilise que le stockage local de votre navigateur pour améliorer votre expérience utilisateur.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Qu'est-ce que le stockage local&nbsp;?</h2>
    <p className="mb-4">Le stockage local (localStorage) permet de conserver certaines informations sur votre appareil, comme vos messages envoyés ou vos préférences d'affichage. Ces données ne sont jamais transmises à un serveur ou à des tiers.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Utilisation sur ce site</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Mémorisation de vos messages envoyés</li>
      <li>Conservation de vos préférences d'affichage</li>
      <li>Amélioration de l'expérience utilisateur</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">Aucune exploitation commerciale</h2>
    <p className="mb-4">Aucune donnée n'est utilisée à des fins publicitaires, de profilage ou de suivi. Aucune information n'est transmise à des tiers.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Vos droits</h2>
    <p className="mb-4">Vous pouvez à tout moment effacer les données stockées via les paramètres de votre navigateur. Pour toute question, contactez-moi à <a href="mailto:alex@salutalex.fr" className="underline text-blue-700">alex@salutalex.fr</a>.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Mentions légales</h2>
    <p>Pour plus d'informations, consultez les <a href="/mentions-legales" className="underline text-blue-700">mentions légales</a> du site.</p>
  </div>
);

export default Confidentialite; 