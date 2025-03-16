'use client';

import React, {useState} from 'react';
import { fetchData } from '@/lib/apiService'

const HomePage = () => {

const [apiKeys, setApiKeys] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);   
        try {
          const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/getAllKeys`);
          setApiKeys(data);

        } catch (error) {
          setError(null); /// this should probably not be null I should actually out some type of errors
        } finally {
          setLoading(false);
        }
      };

    return(
    <div>
      <button onClick={handleFetchData}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {apiKeys && (
        <div>
          <h3>API Keys:</h3>
          <pre>{JSON.stringify(apiKeys, null, 2)}</pre>
        </div>
      )}
    </div>
    );
};

export default HomePage;

/// typescript is SUPER type safe , it wants to know if something can accept a string an int a float or if something is any