import { GetPredictionModels } from "@/api/GetPredictionModels";
import { Prediction } from "@/api/Prediction";
import { PredictionModel } from "@/types/PredictionModel";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Image,
  Input,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const placeholderImage = "https://via.placeholder.com/512";

const PredictionForm = () => {
  const [imagePreview, setImagePreview] = useState<string>(placeholderImage);
  const [predictionModels, setPredictionModels] = useState<PredictionModel[]>(
    []
  );
  const [image, setImage] = useState<File | null>(null);
  const [selectModelID, setSelectModelID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await GetPredictionModels();
        setPredictionModels(res);
        if (res.length > 0) {
          setSelectModelID(res[0].id);
        }
      } catch (e) {
        setPredictionError("モデルの取得に失敗しました");
      }
    };
    fetchModel();
  }, []);

  const handlePrediction = async (e: any) => {
    setLoading(true);
    if (image === null || selectModelID === null) {
      return;
    }
    try {
      const res = await Prediction(selectModelID, image);
      setResult(res.result);
      setPredictionError(null);
    } catch (e) {
      setResult(null);
      setPredictionError("診断に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="fit-content" px="6" py="4">
      <Heading as="h2" size="lg">
        診断
      </Heading>
      {predictionError && (
        <Alert status="error" mt="5">
          <AlertIcon />
          {predictionError}
        </Alert>
      )}
      {result && (
        <Alert status="success" mt="5">
          <AlertIcon />
          {result}
        </Alert>
      )}
      <Box mt="5">
        <Image
          src={imagePreview}
          boxSize="224"
          borderRadius="10%"
          alt="image"
        />
      </Box>
      <Box mt="2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e: any) => {
            if (e.target.files.length > 0) {
              setImage(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            } else {
              setImage(null);
              setImagePreview(placeholderImage);
            }
          }}
        />
      </Box>
      <Box mt="5">
        <Tabs isFitted variant="solid-rounded" colorScheme="cyan">
          <TabList>
            {predictionModels.map((model) => (
              <Tab
                key={model.id}
                onClick={(e: any) => {
                  setSelectModelID(model.id);
                }}
              >
                {model.name}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>
      <Box mt="5">
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          isDisabled={image === null || selectModelID === null}
          onClick={handlePrediction}
          isLoading={loading}
          loadingText="診断中"
        >
          診断開始
        </Button>
      </Box>
    </Box>
  );
};

export default PredictionForm;
