import { userState } from "@/lib/userState";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilValue } from 'recoil';

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps): JSX.Element => {
    const router = useRouter();
    const state = useRecoilValue(userState)

    useEffect(() => {
        if (!state.user) {
            router.push("/sign-in");
        }
    }
    , [state.user, router]);

    return <>{children}</>;
};

export default Auth;
