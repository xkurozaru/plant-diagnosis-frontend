import axios from 'axios';
import { Token } from '@/types/Token';

export const signUp = async (username: string, password: string) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/sign-up`
    const req: signUpRequest = { username: username, password: password }
    try {
        const response = await axios.post(url, req);
        return response.data as Token
    } catch (error) {
        throw new Error('Failed to sign up');
    }
}

interface signUpRequest {
    username: string,
    password: string
}
