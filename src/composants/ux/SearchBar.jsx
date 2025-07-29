import React, { useState } from "react";

// SearchBar moderne avec icône dynamique
const SearchBar = ({ placeholder = "", value, onChange, darkMode = false }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="relative w-full z-50">
      <span className={`absolute top-1/2 -translate-y-1/2 text-base md:text-lg transition-all duration-200 ${focus ? 'right-3 left-auto' : 'left-3 right-auto'} ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </span>
      <input
        type="text"
        className={`w-full ${focus ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base ${darkMode ? 'text-white placeholder-gray-400' : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'}`} style={darkMode ? { backgroundColor: 'var(--dark-secondary-bg)', borderColor: 'var(--dark-border)' } : { backgroundColor: 'var(--light-secondary-bg)', borderColor: 'var(--light-border)' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default SearchBar; 