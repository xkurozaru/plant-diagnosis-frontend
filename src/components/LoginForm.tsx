import { signIn } from "@/api/signIn"
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useState } from "react"

const LoginForm = () => {
    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [alert, setAlert] = useState<string>("")

    const handleNameChange = (e: any) => setName(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)

    const handleLogin = async (e: any) => {
        setAlert("")
        try {
            const res = await signIn(name, password)
            Cookies.set("token", res.access_token)
            router.push("/")
        } catch (e) {
            setAlert("ユーザー名またはパスワードが間違っています")
        }
    }

    return (
        <Box maxW="fit-content" px="6" py="4">
            <Heading as="h2" size="lg">ログイン</Heading>
            {alert && <Alert status="error" mt="5"><AlertIcon />{alert}</Alert>}
            <FormControl mt="5">
                <Box>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input type="text" value={name} onChange={handleNameChange} required minLength={2} maxLength={32} maxW="250" />
                </Box>
                <Box mt="2">
                    <FormLabel>パスワード</FormLabel>
                    <Input type="password" value={password} onChange={handlePasswordChange} required minLength={8} maxLength={72} maxW="250" />
                </Box>
            </FormControl>
            <Button mt="5" colorScheme="teal" onClick={handleLogin}>ログイン</Button>
        </Box>
    )
}

export default LoginForm
