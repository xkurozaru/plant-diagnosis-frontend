import { getPredictionResults } from "@/api/getPredictionResults";
import { PredictionResult } from "@/types/PredictionResult";
import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const PredictionResultList = () => {
    const token = Cookies.get("token")
    const [predictionResults, setPredictionResults] = useState<PredictionResult[]>([])

    useEffect(() => {
        const fetchPredictionResults = async () => {
            try {
                const res = await getPredictionResults(token)
                setPredictionResults(res)
            } catch (e) { }
        }
        fetchPredictionResults()
    }, [])


    return (
        <Box maxW="fit-content" px="6" py="4">
            <Heading as="h2" size="lg">診断履歴</Heading>
            <Box mt="5">
                {predictionResults.map((result) => (
                    <Card key={result.id} variant="elevated" shadow="md" m="1">
                        <CardBody>
                            <Heading size="md">{result.result}</Heading>
                            <Text >{result.predict_at}</Text>
                            <Text >{result.prediction_model_name}</Text>
                        </CardBody>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default PredictionResultList
