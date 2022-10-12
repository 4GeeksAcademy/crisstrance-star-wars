import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiBook,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { SiFuturelearn } from "react-icons/si";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";

const LinkItems = [
  { name: "Home", icon: FiHome, ruta: "/home" },
  { name: "Conversor", icon: FiTrendingUp, ruta: "/conversor" },
  // { name: "Educacion", icon: FiBook, ruta: "./educacion" },
  { name: "Blockchain 101", icon: FiBook, ruta: "/ruta" },
  { name: "What if", icon: SiFuturelearn, ruta: "/whatif" },
  {ruta:"/perfil1"},
];

export default function SidebarWithHeader({ children }) {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (isLoading) {
    return (
      <div>
        {" "}
        <Spinner />{" "}
      </div>
    );
  }
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && ( 
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box pt={10}>
          <Image
            boxSize="140px"
            objectFit="cover"
            src="https://soft-sandwich-76b.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9a6ea0a8-374d-4052-ab10-90adc1837057%2FLogoDefinitivosinLetra.png?table=block&id=1a09e77a-e576-48dc-8719-e84863fa4e99&spaceId=44514f37-bf45-41b8-90cd-647cbf4961f7&width=1000&userId=&cache=v2"
          />
        </Box>
        <Box></Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} ruta={link.ruta}>
          {link.name}
        </NavItem>
      ))}
      <Box pt={100} pl={3}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar size={"sm"} src={user.picture} alt={user.name} />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{user.name}</Text>
                <Text fontSize="xs" color="gray.600">
                  {user.email}
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            
            <MenuDivider />
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Desconectarse
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
    )
  );
};

const NavItem = ({ icon, children, ruta, ...rest }) => {
  return (
    <Link
      href={ruta}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#8C52FF",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  return (
    isAuthenticated && (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
        {/* <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar size={"sm"} src={user.picture} alt={user.name} />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{user.name}</Text>
                <Text fontSize="xs" color="gray.600">
                  {user.email}
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Desconectarse
            </MenuItem>
          </MenuList>
        </Menu> */}
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}></Flex>
        </HStack>
      </Flex>
    )
  );
  return <div></div>;
};
