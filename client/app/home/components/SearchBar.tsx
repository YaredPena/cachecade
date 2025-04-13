'use client';

import { useState } from 'react';

type SearchBarProps = {
  onSearch: (id: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2 justify-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter API Key ID"
        className="px-4 py-2 border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-amber-50 
                   text-black 
                     px-4 
                     py-2 
                     shadow-md 
                     border-2 
                   border-amber-500 
                   hover:bg-amber-200 
                     focus:outline-none 
                   hover:text-black 
                     transition 
                     duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;