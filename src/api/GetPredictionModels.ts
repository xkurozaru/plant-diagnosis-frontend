import { tokenState } from "@/lib/tokenState";
import { PredictionModel } from "@/types/PredictionModel";
import axios from "axios";
import { useRecoilValue } from "recoil";

export const GetPredictionModels = async () => {
  const token = useRecoilValue(tokenState);

  const url = `${process.env.NEXT_PUBLIC_HOST}/prediction-models`;
  const headers = { Authorization: `Bearer ${token.access_token}` };

  try {
    const response = await axios.get(url, { headers });
    return response.data as PredictionModel[];
  } catch (error) {
    throw new Error("Failed to fetch prediction models");
  }
};
