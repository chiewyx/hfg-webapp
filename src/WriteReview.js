import React, { useState } from "react";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Heading,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Textarea,
  Image,
} from "@chakra-ui/react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import { useToast } from "@chakra-ui/react";

export default function WriteReview() {
  const toast = useToast();

  const [region, setRegion] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [problem, setProblem] = useState("");
  const [improvement, setImprovement] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

      setRegion(""); 
      setAddress1(""); 
      setPostalCode("");
      setProblem("");
      setImprovement(""); 

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
        <form onSubmit={handleSubmit}>
          <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
            Review Form
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
            />
          </FormControl>

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
          my={10}
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />

          <Button w="7rem" colorScheme="red" variant="solid" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
