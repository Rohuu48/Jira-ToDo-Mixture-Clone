import { useState } from 'react';
import { Flex, Button, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [display, changeDisplay] = useState('none');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Flex boxShadow="0 0.5rem 1rem rgba(0, 0, 0, 0.15)">
      <Flex justify="flex-end" align="center" left="auto">
        {/* Desktop */}
        <Flex display={['none', 'none', 'flex', 'flex']}>
          <Link to="/">
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </Link>

          {!isLoggedIn && (
            <>
              <Link to="/login">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Login"
                  my={5}
                  w="100%">
                  Log in
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Signup"
                  my={5}
                  w="100%">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/dashboard">
              <Button
                as="a"
                variant="ghost"
                aria-label="Dashboard"
                my={5}
                w="100%">
                Dashboard
              </Button>
            </Link>
          )}
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay('flex')}
          display={['flex', 'flex', 'none', 'none']}
        />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column">
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link to="/">
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </Link>

          {!isLoggedIn && (
            <>
              <Link to="/login">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Login"
                  my={5}
                  w="100%">
                  Log in
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Signup"
                  my={5}
                  w="100%">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/dashboard">
              <Button
                as="a"
                variant="ghost"
                aria-label="Dashboard"
                my={5}
                w="100%">
                Dashboard
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
