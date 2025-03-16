import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchData = async (endpoint: string) => {
    try{
        const response = await api.get(endpoint);
        return response.data;
    } catch(error){
        console.error(`Could not fetch: ${error}`);
        throw error;
    }
}

