import axios from 'axios';

export const getPredictionResults = async (token: string | undefined) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/prediction-results`;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch prediction results');
    }
};
