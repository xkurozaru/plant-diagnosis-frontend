import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { Box } from "@chakra-ui/react";

import type { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <Box>
      <Header />
      <LoginForm />
    </Box>
  );
};

export default SignInPage;
