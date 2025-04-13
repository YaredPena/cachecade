'use client';

import React, { useState } from 'react';
import axios from 'axios';

type DeleteFormProps = {
  onSuccess: () => void;
};

const DeleteForm = ({ onSuccess }: DeleteFormProps) => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      setError('An ID is required to delete.');
      return;
    }
    
    else {
    setLoading(true);
    setError(null);

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteKey/${id}`);
            onSuccess();

        } catch (error: any) {
            setError(error.response?.data);

        } finally {
            setLoading(false);
        }
    }
  };

  return (
    <form
      onSubmit={handleDelete}
      className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Delete API Key</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">API Key ID</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter the ID of the key to delete"
        />
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {loading && <p className="text-gray-600 mb-3">Deleting...</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 hover:bg-amber-200 transition"
      >
        Delete
      </button>
    </form>
  );
};

export default DeleteForm;
