import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Box,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "../styles/edit.module.css";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../redux/action";

export default function EditModal({ profile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [name, setName] = useState(profile?.name);
  const [email, setMail] = useState(profile?.email);
  const [mob, setMobile] = useState(profile?.mob);
  const [age, setAge] = useState(profile?.age);
  const [gender, setGender] = useState(profile?.gender);
  const [address, setAddress] = useState(profile?.address);
  let token = JSON.parse(localStorage.getItem("guvitoken")) || null;
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      age,
      mob,
      address,
      gender,
    };

    dispatch(updateProfile(payload, token)).then((res) => {
      if (res.type === "UPDATE_PROFILE_SUCCESS") {
        dispatch(getProfile(token));
      }
    });
  };

  return (
    <>
      <Button
        bg={"#4E5D74"}
        color={"white"}
        rightIcon={<AiOutlineEdit color="white" size={'16px'} />}
        w={"fit-content"}
        h={"fit-content"}
        p={2}
        fontSize={{ base: "10px", md: "12px" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Edit Profile Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdate}>
              <Flex className={styles.cont}>
                <input
                  type="text"
                  value={name || ""}
                  placeholder="Add name..."
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  value={email || ""}
                  placeholder="Add email..."
                  onChange={(e) => setMail(e.target.value)}
                />
                <input
                  type="number"
                  value={age || ""}
                  placeholder="Add age..."
                  onChange={(e) => setAge(e.target.value)}
                />
                <select
                  onChange={(e) => setGender(e.target.value)}
                  defaultValue={gender || ""}
                >
                  <option value="">select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="number"
                  value={mob || ""}
                  placeholder="Add mobile..."
                  onChange={(e) => setMobile(e.target.value)}
                />
                <input
                  type="text"
                  value={address || ""}
                  placeholder="Add address..."
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Flex>
              <Box mt={5} pb={5}>
                <Button color={"white"} bg={"#4E5D74"} mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color={"white"} bg={"#32cd30"}>
                  Update
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
