import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Button,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

export default function ReviewWithLike(props) {
  const [liked, setLiked] = useState(false);

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={
              props.image
            }
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              Review
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {props.fault}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {props.description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Popover>
              <PopoverTrigger>
                <Button fontSize={"md"} fontWeight={"semibold"}>
                  View more
                </Button>
              </PopoverTrigger>
              <PopoverContent color={useColorModeValue("6px 6px 0 black", "6px 6px 0 white")}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>More details</PopoverHeader>
                <PopoverBody>
                  <Text as="b">Location: </Text> 
                  {props.address1}{" "}{props.postalcode}
                  <br />
                  <Text as="b">Problem: </Text>
                  {props.fault} 
                  <br />
                  <Text as="b">Improvement: </Text>
                  {props.improvement}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
