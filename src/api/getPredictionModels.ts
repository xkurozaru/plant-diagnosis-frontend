import { PredictionModel } from '@/types/PredictionModel';
import axios from 'axios';

export const getPredictionModels = async (token: string | undefined) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/prediction-models`;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.get(url, { headers });
        return response.data as PredictionModel[];
    } catch (error) {
        throw new Error('Failed to fetch prediction models');
    }
};
