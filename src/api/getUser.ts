import { User } from '@/types/User';
import axios from 'axios';

export const getUser = async (token: string | undefined) => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/users/me`
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.get(url, { headers });
        return response.data as User
    } catch (error) {
        return null;
    }
}
