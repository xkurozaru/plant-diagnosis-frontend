import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { getUser } from "../api/getUser";

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps): JSX.Element => {
    const router = useRouter();
    const token = Cookies.get("token");

    useEffect(() => {
        if (token === undefined) {
            router.push("/sign-in");
        }

        const fetchUser = async () => {
            const user = await getUser(token);
            if (user === null) {
                router.push("/sign-in");
            }
        };

        fetchUser();
    }, [router, token]);

    return <>{children}</>;
};

export default Auth;
