'use client';

import React, {useState} from 'react';
import { fetchData } from '@/lib/apiService'

const HomePage = () => {
/// so you want to clarifiy the types first 
type ApiError = {
    message: string;
    status?: number;
  };

type ApiKeys = {
    id: string;
    key: string;
    }[];

// then your actual variables
const [apiKeys, setApiKeys] = useState<ApiKeys | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<ApiError | null>(null);

    const fetchAllKeys = async () => {
        setLoading(true);
        setError(null);   
        try {
          const allKeys = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/getAllKeys`);
          setApiKeys(allKeys);

        } catch (error) {

            if (error instanceof Error) {
                setError({ message: error.message }); 
            } else {
                setError({ message: 'An unknown error occurred' });
            }
        } finally {
          setLoading(false);
        }
      };

      const fetchOneKey = async () => {
        setLoading(true);
        setError(null);

        try{
            const oneKey = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/getOneKey/:id}`);
            setApiKeys(oneKey);
            
        } catch (error) {
            if (error instanceof Error) {
                setError({ message: error.message });
            } else {
                setError({ message: 'An unknown error occured' });
            }
        } finally { 
            setLoading(false);
        }
      
      } 


      /// haven't decided if I need to build this all the way yet
      /* const fetchKeyByName = () => {
        setLoading(true);
        setError(null);

        try{
            const oneKeyName = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/getOneKey/:name}`);
        } catch (error) {
            some error
        } finally {
            update some state
        }
      
      }
      
      */

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-amber-50 py-10">
      <div className="bg-gray-200 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Manage API Keys
        </h1>
        {/*  I figured out how to do buttons that are square but still look nice!
             no need for rounded-lg just be mindful of padding (px , py)
             and add border.
        */}
        <div className="space-x-4 mb-6 text-center">
          <button
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
            onClick={fetchAllKeys}
          >
            Get All Keys
          </button>
          
          <button
            className="bg-amber-50 
                       text-black 
                       px-4 
                       py-2 
                       shadow-md 
                       border-2 
                       border-amber-800 
                       hover:bg-amber-200 
                       focus:outline-none 
                       hover:text-black 
                       transition 
                       duration-300"
            onClick={fetchOneKey}
          >
            Get One Key
          </button>
        </div>
  
        {loading && (
          <div className="text-center text-gray-600">
            <p>Loading...</p>
          </div>
        )}
  
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-6 text-center">
            <p>Error: {error.message}</p>
          </div>
        )}
  
        {/* show my api keys */}
        {apiKeys && apiKeys.length > 0 && (
          <div className="bg-gray-50 text-black p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">API Keys:</h3>
            <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded-md overflow-auto">
              {JSON.stringify(apiKeys, null, 2)}
            </pre>
          </div>
        )}

        {apiKeys && apiKeys.length === 0 && (
          <div className="text-center text-gray-600 mt-4">
            <p>No API keys available.</p>
          </div>
        )}
      </div>
    </div>
  );      
};

export default HomePage;

/// typescript is SUPER type safe , it wants to know if something can accept a string an int a float or if something is any

// before anymore progress is made I should make some documentation....

// I'll pick up on this later got class projects to finish will work on this next saturday