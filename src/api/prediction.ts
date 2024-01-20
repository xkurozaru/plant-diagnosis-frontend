import { PredictionResult } from "@/types/PredictionResult";
import axios from "axios";

export const prediction = async (token: string | undefined, model_id: string, image_file: File) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/prediction-models/${model_id}`
    const req = new FormData();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    req.append('image_file', image_file);
    try {
        const response = await axios.post(url, req, { headers });
        return response.data as PredictionResult;
    } catch (error) {
        throw new Error('Failed to predict');
    }
}
