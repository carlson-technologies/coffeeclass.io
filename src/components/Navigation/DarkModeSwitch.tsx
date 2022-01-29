import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="md"
      aria-label={`Toggle ${colorMode === "dark" ? "light" : "dark"} mode`}
      icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
      fontSize="20px"
      onClick={toggleColorMode}
      borderRadius={5}
      variant="ghost"
      _hover={{ transform: "scale(1.1) rotate(360deg)" }}
      transition="transform 1s"
      w={50}
      data-splitbee-event="Button Click"
      data-splitbee-event-type="Dark Mode Toggle"
    />
  );
};

export default DarkModeSwitch;
