import { tokenState } from "@/lib/tokenState";
import { User } from "@/types/User";
import axios from "axios";
import { useRecoilValue } from "recoil";

export const GetUser = async () => {
  const token = useRecoilValue(tokenState);
  console.log(token);
  const url = `${process.env.NEXT_PUBLIC_HOST}/users/me`;
  const headers = { Authorization: `Bearer ${token.access_token}` };
  try {
    const response = await axios.get(url, { headers });
    return response.data as User;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
