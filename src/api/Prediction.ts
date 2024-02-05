import { tokenState } from "@/lib/tokenState";
import { PredictionResult } from "@/types/PredictionResult";
import axios from "axios";
import { useRecoilValue } from "recoil";

export const Prediction = async (model_id: string, image_file: File) => {
  const token = useRecoilValue(tokenState);

  const url = `${process.env.NEXT_PUBLIC_HOST}/prediction-models/${model_id}`;
  const req = new FormData();
  const headers = { Authorization: `Bearer ${token.access_token}` };
  req.append("image_file", image_file);
  try {
    const response = await axios.post(url, req, { headers });
    return response.data as PredictionResult;
  } catch (error) {
    throw new Error("Failed to predict");
  }
};
