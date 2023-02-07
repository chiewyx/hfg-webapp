import { Stack, Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <Flex minH={"100vh"} align={"top"} justify={"center"} bgColor="Gray">
        <Stack spacing={4} direction="row" align="center">
          <ButtonGroup gap="4">
            <Button
              size="md"
              height="52px"
              width="200px"
              colorScheme="whiteAlpha"
              as={ReactRouterLink}
              to="/login"
            >
              {" "}
              Login{" "}
            </Button>
            <Button
              size="md"
              height="52px"
              width="200px"
              colorScheme="blackAlpha"
              as={ReactRouterLink}
              to="/signup"
            >
              {" "}
              Sign Up{" "}
            </Button>
          </ButtonGroup>
        </Stack>
      </Flex>
    </div>
  );
}
