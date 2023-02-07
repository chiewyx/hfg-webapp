import { ReactNode } from 'react';
import NavBar from "./NavBar"; 
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import SimpleMap from "./map"


export default function Nav() {
  return (
    <>
     <NavBar /> 
     <SimpleMap />
    </>
  );
}