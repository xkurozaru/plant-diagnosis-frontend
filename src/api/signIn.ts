import { Token } from '@/types/Token';
import axios from "axios";

export const signIn = async (username: string, password: string) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/sign-in`
    const req = new URLSearchParams();
    req.append('username', username);
    req.append('password', password);
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    try {
        const response = await axios.post(url, req, { headers });
        return response.data as Token
    } catch (error) {
        throw new Error('Failed to sign in');
    }
}
