// Composant DetailEmailView : affiche le détail d'un mail sélectionné

import React from "react";

const DetailEmailView = ({ avatar, name, subject, date, content }) => (
  <section className="flex-1 bg-white h-full overflow-y-auto p-8 rounded-2xl">
    <div className="flex items-center gap-4 mb-6">
      <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover" />
      <div>
        <div className="font-bold text-lg text-gray-900">{name}</div>
        <div className="text-blue-700 font-semibold">{subject}</div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>
    </div>
    <div className="text-gray-800 text-base leading-relaxed">
      {content}
    </div>
  </section>
);

export default DetailEmailView; 