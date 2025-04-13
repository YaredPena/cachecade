'use client';

import React, { useState } from 'react';
import axios from 'axios';

// take for every page you've made you NEED to create a prop type for it
type PostFormProps = {
  onSuccess: () => void;
};

const PostForm = ({ onSuccess }: PostFormProps) => {
  const [keyName, setKeyName] = useState(''); /// we need a hook for each request of the body 
  const [apiKey, setApiKey] = useState(''); 
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostKey = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/postKey`, {
        keyName,
        apiKey,
        description,
      });

      setKeyName('');      /// we have to set the keyName
      setApiKey('');       /// ApiKey 
      setDescription('');  /// and Description

      onSuccess(); 
    } catch (error: any) {
      setError(error.response?.data || 'Could not post API key');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchPostKey();
  };

  return (
    <form onSubmit={handleSubmit} 
          className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 focus:outline-none hover:text-black">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Post API Key Form</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Key Name</label>
        <input
          className="w-full p-2 border rounded"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">API Key</label>
        <input
          className="w-full p-2 border rounded"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {loading && <p className="text-gray-600 mb-3">Submitting...</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 hover:bg-amber-200 focus:outline-none hover:text-black transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;