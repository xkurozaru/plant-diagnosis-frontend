import { Box, Flex, Heading } from "@chakra-ui/react"
import Cookies from "js-cookie"
import NextLink from 'next/link'
import { useEffect, useState } from "react"
import { getUser } from "../api/getUser"

const Header = () => {
    const token = Cookies.get("token")
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(token)
            if (user !== null) {
                setUsername(user.username)
            }
        }
        fetchUser()
    }, [token])

    return (
        <Box as="header" bg="gray.100" px="6" py="6">
            <Flex alignItems="center">
                <Box>
                    <NextLink href="/"><Heading as="h1" size="lg" cursor="pointer">植物病害診断</Heading></NextLink>
                </Box>
                <Box ml="auto">
                    {username ? (
                        <Heading as="h2" size="md">{username}</Heading>
                    ) : (
                        <NextLink href="/sign-up"><Heading as="h2" size="md" cursor="pointer">会員登録</Heading></NextLink>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export default Header
