import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps): JSX.Element => {
    const router = useRouter();
    const token = Cookies.get("token");

    if (token === undefined) {
        router.push("/sign-in");
    }

    return <>{children}</>;
};

export default Auth;
