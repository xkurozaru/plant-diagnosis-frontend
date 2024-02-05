import { userState } from "@/lib/userState";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";

interface AuthProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthProps): JSX.Element => {
  const router = useRouter();
  const state = useRecoilValue(userState);

  useEffect(() => {
    if (state.username !== "") {
      router.push("/sign-in");
    }
  }, [state, router]);

  return <>{children}</>;
};

export default Auth;
