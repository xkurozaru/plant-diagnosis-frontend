import { GetUser } from "@/api/GetUser";
import { SignUp } from "@/api/SignUp";
import { tokenState } from "@/lib/tokenState";
import { userState } from "@/lib/userState";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

const SignupForm = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);

  const handleNameChange = (e: any) => setName(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const isErrorName: boolean = name.length < 2 || name.length > 32;
  const isErrorPassword: boolean = password.length < 8 || password.length > 72;

  const handleSignup = async (e: any) => {
    setAlert("");
    try {
      const res = await SignUp(name, password);
      setToken(res);
      const user = await GetUser();
      setUser(user);
      router.push("/");
    } catch (e) {
      setAlert("そのユーザー名は既に使用されています");
    }
  };

  return (
    <Box maxW="fit-content" px="6" py="4">
      <Heading as="h2" size="lg">
        サインアップ
      </Heading>
      {alert && (
        <Alert status="error" mt="5">
          <AlertIcon />
          {alert}
        </Alert>
      )}
      <FormControl isInvalid={isErrorName} mt="5">
        <FormLabel>ユーザー名</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
          minLength={2}
          maxLength={32}
          maxW="250"
        />
        <FormErrorMessage>
          ユーザー名は2文字以上32文字以下で入力してください
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={isErrorPassword} mt="2">
        <FormLabel>パスワード</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength={8}
          maxLength={72}
          maxW="250"
        />
        <FormErrorMessage>
          パスワードは8文字以上72文字以下で入力してください
        </FormErrorMessage>
      </FormControl>
      <Button
        mt="5"
        onClick={handleSignup}
        isDisabled={isErrorName || isErrorPassword}
      >
        サインアップ
      </Button>
    </Box>
  );
};

export default SignupForm;
