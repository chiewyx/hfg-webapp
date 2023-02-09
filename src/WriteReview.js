import React, { useState } from "react";
import NavBar from "./NavBar";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Image,
  Textarea,
} from "@chakra-ui/react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import { Link as ReactRouterLink } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function WriteReview() {
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const [region, setRegion] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [problem, setProblem] = useState("");
  const [improvement, setImprovement] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        region: region,
        address1: address1,
        address2: address2,
        postal_code: postal_code,
        problem: problem,
        improvement: improvement,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      toast({
        title: "Review Submitted.",
        description: "Thank you for your review!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const Form2 = (e) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
      <div key="form2">
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Upload Image
        </Heading>
        {selectedImage && (
          <div>
            <Image
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <Button onClick={() => setSelectedImage(null)}> Remove </Button>
          </div>
        )}

        <Input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };

  const Form1 = (e) => {
    return (
      <div key="form1">
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Location Details
        </Heading>
        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="region"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Region
          </FormLabel>
          <Select
            id="region"
            placeholder="Select option"
            onChange={(e) => setRegion(e.target.value)}
            value={region || ""}
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
          >
            <option>East</option>
            <option>West</option>
            <option>North</option>
            <option>South</option>
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="address1"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Street address
          </FormLabel>
          <Input
            type="text"
            name="address1"
            id="address1"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={address1 || ""}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
          <FormLabel
            htmlFor="address2"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Street Address
          </FormLabel>

          <Input
            type="text"
            id="address2"
            autoComplete="street-address"
            onChange={(e) => setAddress2(e.target.value)}
            value={address2 || ""}
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
          />
        </FormControl>

        <FormLabel
          htmlFor="address2"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Street Address
        </FormLabel>

        <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
          <FormLabel
            htmlFor="postal_code"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            ZIP / Postal
          </FormLabel>
          <Input
            type="text"
            name="postal_code"
            id="postal_code"
            autoComplete="postal_code"
            maxLength={6}
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={postal_code}
            onChange={(e) => setPostalCode(e.target.value)}
            onBlur={(event) => event.target.focus()}
          />
        </FormControl>
      </div>
    );
  };

  const Form3 = () => {
    return (
      <div key="form3">
        <Heading w="100%" textAlign={"center"} fontWeight="normal">
          Review
        </Heading>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl id="wrong" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              What is wrong?
            </FormLabel>
            <Textarea
              placeholder="This place is..."
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
              value={problem || ""}
              onChange={(e) => setProblem(e.target.value)}
            />
          </FormControl>

          <FormControl id="improve" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: "gray.50",
              }}
            >
              How it can be improved?
            </FormLabel>
            <Textarea
              placeholder="It can be improved by..."
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{
                sm: "sm",
              }}
              onChange={(e) => setImprovement(e.target.value)}
              value={improvement || ""}
            />
          </FormControl>
        </SimpleGrid>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        <form onSubmit={handleSubmit}>
          {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 3}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              {step === 3 ? (
                <Button
                  w="7rem"
                  colorScheme="red"
                  variant="solid"
                  type="submit"
                >
                  Submit
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </form>
      </Box>
    </>
  );
}
