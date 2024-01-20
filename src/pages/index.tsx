import Header from "@/components/Header"
import PredictionForm from "@/components/PredictionForm"
import PredictionResultList from "@/components/PredictionResultList"
import { HStack } from "@chakra-ui/react"
import Auth from "../lib/auth"


import type { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <Auth>
      <Header />
      <HStack align="flex-start">
        <PredictionForm />
        <PredictionResultList />
      </HStack>
    </Auth>
  )
}

export default HomePage
