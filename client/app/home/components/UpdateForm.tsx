'use client';

import React, { useState } from 'react';
import axios from 'axios';

type UpdateFormProps = {
  onSuccess: () => void;
};

const UpdateForm = ({ onSuccess }: UpdateFormProps) => {
  const [id, setId] = useState('');
  const [keyName, setKeyName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpdateKey = async () => {
    setLoading(true);
    setError(null);

    try {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/patchKey/${id}`, {
            keyName,
            apiKey,
            description,
        });

        onSuccess();
    } catch(error: any) {

        setError(error.response?.data);
    } finally {

        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !keyName || !apiKey || !description) {
      setError('Please fill in all fields including the ID.');
      return;
    }

    await fetchUpdateKey();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 focus:outline-none hover:text-black"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Update API Key</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">API Key ID</label>
        <input
          className="w-full p-2 border rounded"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter the ID of the key to update"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Key Name</label>
        <input
          className="w-full p-2 border rounded"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">API Key</label>
        <input
          className="w-full p-2 border rounded"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
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
      {loading && <p className="text-gray-600 mb-3">Updating...</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 hover:bg-amber-200 transition"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateForm;