'use client';

import React, {useState} from 'react';
import { fetchData } from '@/lib/apiService'

const [apiKeys, setApiKeys] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const HomePage = () => {

    const handleFetchData = async () => {

        try{
            
            const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}`);

        } catch(error) {

        } finally{

        }
    }

    return(
        <h1 className="underline">hi homepage</h1>
    );
};

export default HomePage;

/// typescript is SUPER type safe , it wants to know if something can accept a string an int a float or if something is any