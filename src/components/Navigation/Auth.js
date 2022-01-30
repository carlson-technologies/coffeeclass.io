import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  useDisclosure,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  useColorModeValue,
  Button,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { GitHubIcon } from "../CustomIcons";
import { signInWithGithub } from "../../utils/auth/signInGithub";
import { logOut } from "../../utils/auth/logOut";
import { supabase } from '../../utils/supabaseClient';
import { FiLogOut } from "react-icons/fi";
import NextLink from "next/link"

export default function Auth() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.100", "gray.800");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = supabase.auth.user()
    setUser(user)
    console.log(user)
  }, []);

  return (
    <>
      {
        user ? (
          <NextLink href="/profile" passHref>
            <Link href="/profile">
              <Avatar
                name={user.user_metadata.full_name}
                src={user.user_metadata.avatar_url}
                size="sm"
              />
            </Link>
          </NextLink>
        ) : (
          <IconButton
            w={50}
            borderRadius={5}
            icon={<FiUser />}
            fontSize="20px"
            aria-label="Sign in"
            variant="ghost"
            p={[1, 2, 4]}
            ml={1}
            onClick={onOpen}
          />
        )
      }

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bgColor={bgColor}>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              leftIcon={<GitHubIcon />}
              colorScheme={useColorModeValue("blackAlpha", "gray")}
              onClick={() => signInWithGithub()}
            >
              Sign in with GitHub
            </Button>

            <Button
              leftIcon={<FiLogOut />}
              colorScheme="red"
              onClick={() => logOut()}
            >
              Log Out
            </Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
