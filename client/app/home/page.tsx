'use client';

import React, {useState} from 'react';
import { fetchData } from '@/lib/apiService'
import SearchBar from './components/SearchBar';
import PostForm from './components/PostForm';
import UpdateForm from './components/UpdateForm';

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
const [showPostForm, setShowPostForm] = useState(false);
const [showUpdateForm, setShowUpdateForm] = useState(false);
///const [selectedKey, setSelectedKey] = useState<ApiKeys | null>(null);



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

      const fetchOneKey = async (id: string) => { /// we have to assign a parameter through the function and it's type!!!
        setLoading(true);
        setError(null);

        try{
            const oneKey = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/getOneKey/${id}`);
            setApiKeys([oneKey]);
            
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

      /*
      const fetchPostKey = async () =>{ // this shouldn't need a type 
        setLoading(true);
        setError(null);

        try{
          const postKey = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/postKey`);
          setApiKeys(postKey);

        } catch(error) {
            if(error instanceof Error) {
              setError({ message: error.message});
            } else {
              setError({ message: "could not post api key"});
            }
        } finally {
          setLoading(false);
        }
      }
      */

      /*
      const fetchUpdateKey = async (id: string) =>{
        setLoading(true);
        setError(null);

        /// this is exactly like 
        
        if 
        elif
        else
        
        
        try{
          /// assign your variable
          const updateKey = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/patchKey/${id}`);
          setApiKeys(updateKey); // call it through the setter function

          /// error handling our catch <<-- just like node.js
        } catch(error){
          if(error instanceof Error){
            setError({ message: error.message});
          } else {
            setError({message: "could not update api key"});
          }

          /// just set Loading
        } finally {
          setLoading(false);
        }
      }
      */

      const fetchDeleteKey = async (id: string) =>{
        setLoading(true);
        setError(null);

        try{
          const deleteKey = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/deleteKey/${id}`);
          setApiKeys(deleteKey);

        } catch(error){
          if(error instanceof Error){
            setError({ message: error.message});
          } else {
            setError({message: "could not delete api key"});
          }

        } finally {
          setLoading(false);
        }
      }
      
      /// I need a flex box that way api keys can be on the right hand side (our results)
        /// Then search bar + get oneKeyById on top
        /// then POST Api key <- maybe I should make this a form???
        /*  my body: 
        {"keyName": "",
         "apiKey": "",
         "description":}
        */
        /// the update key by id: 
        /// you don't have to update the body all at once 
        /// then delete key by id:
        /// then GET All keys button
        return (
          <div className="min-h-screen bg-amber-50 py-10 flex justify-center">
            <div className="flex flex-row gap-10 w-full max-w-6xl px-4">
              
              {/* my options on the flex box, left hand side */}
              <div className="flex flex-col w-1/2 mt-4 bg-amber-50 text-black p-6 px-4 py-2 shadow-md border-2 border-amber-500 focus:outline-none hover:text-black">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Manage API Keys
                </h1>
        
                <SearchBar onSearch={fetchOneKey} />

              {/* this is calling the postform on the UI, after getting imported */}
                <button
                  onClick={() => setShowPostForm((prev) => !prev)}
                  className="mb-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 hover:bg-amber-200 focus:outline-none hover:text-black transition duration-300"
                >
                  {showPostForm ? 'Hide Create Form' : 'Post API Key'}
                </button>
        
                {showPostForm && (
                  <PostForm
                    onSuccess={() => {
                      fetchAllKeys();
                      setShowPostForm(false);
                    }}
                  />
                )}

                {/* this should be for the update form */}
                <button 
                  onClick ={() => setShowUpdateForm((prev) => !prev)}
                  className="mb-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 hover:bg-amber-200 focus:outline-none hover:text-black transition duration-300"
                >
                  {showUpdateForm ? 'Hide Update Form' : 'Update API Key'}
                </button>

                {showUpdateForm && (
                  <UpdateForm
                  onSuccess={() => {
                    fetchAllKeys();
                    setShowUpdateForm(false);
                    }}
                  />
                )}
        
                <button
                  className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 hover:bg-amber-200 focus:outline-none hover:text-black transition duration-300"
                  onClick={fetchAllKeys}
                >
                  Get All Keys
                </button>
              </div>
        
              {/* my results on the flex box, right hand side  */}
              <div className="flex-1 mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 focus:outline-none">
                {loading && (
                  <div className="text-center text-gray-600 mb-4">
                    <p>Loading...</p>
                  </div>
                )}
        
                {error && (
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-6 text-center">
                    <p>Error: {error.message}</p>
                  </div>
                )}
        
                {apiKeys && apiKeys.length > 0 && (
                  <div className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 focus:outline-none">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">API Keys:</h3>
                    <pre className="mt-4 bg-amber-50 text-black px-4 py-2 shadow-md border-2 border-amber-500 focus:outline-none">
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
          </div>
        );
}      
export default HomePage;

/// typescript is SUPER type safe , it wants to know if something can accept a string an int a float or if something is any

// before anymore progress is made I should make some documentation....

// I'll pick up on this later got class projects to finish will work on this next saturda