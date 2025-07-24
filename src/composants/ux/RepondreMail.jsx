import React from "react";
import { FiPaperclip } from "react-icons/fi";

// Composant RepondreMail : formulaire de réponse à un mail, style moderne
const RepondreMail = ({
  from = "hello@mattered.com",
  subject = "Let's work together",
  message = "Hi Mattered team,\n\nI'd love to chat about how we might work together on an upcoming project.\n\nLooking forward to connecting!",
  onClose
}) => (
  <div className="bg-white rounded-2xl shadow-xl w-[420px] max-w-full p-0 border border-gray-200">
    <div className="flex items-center justify-between px-5 py-3 border-b">
      <span className="font-semibold text-lg">New Message</span>
      <div className="flex gap-2">
        <button className="w-6 h-6 rounded hover:bg-gray-100">-</button>
        <button className="w-6 h-6 rounded hover:bg-gray-100">□</button>
        <button className="w-6 h-6 rounded hover:bg-gray-100" onClick={onClose}>×</button>
      </div>
    </div>
    <form className="flex flex-col gap-3 px-5 py-4">
      <input
        className="w-full rounded border border-gray-200 px-3 py-2 text-gray-500 bg-gray-50 text-sm"
        placeholder="From"
        value={from}
        readOnly
      />
      <input
        className="w-full rounded border border-gray-200 px-3 py-2 text-gray-500 bg-gray-50 text-sm"
        placeholder="Subject"
        value={subject}
        readOnly
      />
      <textarea
        className="w-full rounded border border-gray-200 px-3 py-2 text-gray-500 bg-gray-50 text-sm font-mono min-h-[100px]"
        placeholder="Message"
        defaultValue={message}
      />
      <div className="flex items-center justify-between mt-2">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          Send <span className="text-lg">▻</span>
        </button>
        <div className="flex items-center gap-4">
          <button type="button" className="text-gray-500 hover:text-gray-700 text-xl"><FiPaperclip /></button>
          <button type="button" className="text-gray-500 hover:text-gray-700 text-xl font-bold">T</button>
        </div>
      </div>
    </form>
  </div>
);

export default RepondreMail; 