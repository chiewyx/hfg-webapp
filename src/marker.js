import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { RiMapPin3Fill } from "react-icons/ri";

/*
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

const handleClick = () => {
    <div>
    <IconButton onClick={onOpen} />
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Hello</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
};

const Marker = ({ text, onClick }) => (
    <Wrapper alt={text} onClick={handleClick} />
);


Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
*/

function Marker(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <IconButton
        onClick={onOpen}
        icon={<RiMapPin3Fill />}
        variant="transparent"
        color="red"
        fontSize="2xl"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="b">Location: </Text>
            {props.address1} {props.postalcode}
            <br />
            <Text as="b">Problem: </Text>
            {props.fault}
            <br />
            <Text as="b">Improvement: </Text>
            {props.improvement}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Marker;
