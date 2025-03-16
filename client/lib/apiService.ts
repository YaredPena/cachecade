import axios from 'axios';

// this is how we will actually connect to the server I made in node.js
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// this is how I'll be fetching data from the CRUD restendpoints I built
export const fetchData = async (endpoint: string) => {
    // try to get response and return res.data
    // otherwise catch the error.
    try{
        const response = await api.get(endpoint);
        return response.data;
    } catch(error){
        console.error(`Could not fetch: ${error}`);
        throw error;
    }
}

