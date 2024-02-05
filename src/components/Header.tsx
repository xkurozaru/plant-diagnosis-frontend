import { Box, Flex, Heading } from "@chakra-ui/react"
import NextLink from 'next/link'

import { userState } from '@/lib/userState'
import { useRecoilValue } from 'recoil'

const Header = () => {
    const user = useRecoilValue(userState)

    return (
        <Box as="header" bg="gray.100" px="6" py="6">
            <Flex alignItems="center">
                <Box>
                    <NextLink href="/"><Heading as="h1" size="lg" cursor="pointer">植物病害診断</Heading></NextLink>
                </Box>
                <Box ml="auto">
                    {user.username ? (
                        <Heading as="h2" size="md">{user.username}</Heading>
                    ) : (
                        <NextLink href="/sign-up"><Heading as="h2" size="md" cursor="pointer">会員登録</Heading></NextLink>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export default Header
