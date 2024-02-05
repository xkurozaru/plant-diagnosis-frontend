import Header from "@/components/Header";
import SignupForm from "@/components/SignupForm";
import { Box } from "@chakra-ui/react";

import type { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <Box>
      <Header />
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
