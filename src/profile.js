import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Image,
  Box
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function UserProfileEdit() {
  const [ProfilePic, setProfilePic] = useState(null);

  return (
    <>
      <NavBar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                {ProfilePic && (
                  <div>
                    <Avatar
                      size={"md"}
                      alt="not fount"
                      width={"150px"}
                      height={"150px"}
                      src={URL.createObjectURL(ProfilePic)}
                    >
                      <AvatarBadge
                        as={IconButton}
                        onClick={() => setProfilePic(null)}
                        size="sm"
                        rounded="full"
                        top="-10px"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                      />
                    </Avatar>
                  </div>
                )}{" "}
                <Input
                  type="file"
                  id="BtnBrowseHidden"
                  name="files"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setProfilePic(event.target.files[0]);
                  }}
                  hidden
                />
                
                <Button> 
                  <label htmlFor="BtnBrowseHidden" id="LblBrowse">
                    Change Icon
                  </label>
                  </Button>
             
              </Center>
              <Center w="full"></Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              as="a"
              href="/home"
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
