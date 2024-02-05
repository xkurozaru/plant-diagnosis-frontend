import { tokenState } from "@/lib/tokenState";
import axios from "axios";
import { useRecoilValue } from "recoil";

export const GetPredictionResults = async () => {
  const token = useRecoilValue(tokenState);

  const url = `${process.env.NEXT_PUBLIC_HOST}/prediction-results`;
  const headers = { Authorization: `Bearer ${token.access_token}` };
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch prediction results");
  }
};
