'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react'
import WithSubnavigation from './WithSubnavigation'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    
    const openModal = () => setAlert(true);
    const closeModal = () => setAlert(false);
    const toast=useToast()
    const navigate = useNavigate()
    const handleSubmit =()=>{
        const payload ={
            email,
            password
        }
        fetch("http://localhost:8080/users/login",{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
            if(res.msg === "wrong credentials"){
                toast({
                  position: 'top-right',
                  title: 'Login Not Sucessful with wrong creditials',
                  description: `Please Sign up Firstly with wrong creditials`,
                  status: 'warning',
                  duration: 5000,
                  isClosable: true,
              })
              navigate('/register');
              }
              else{
              localStorage.setItem("token",res.token)
                toast({
                position: 'top-right',
                title: 'Login Successful ✔',
                description: `Thank You for Login`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            navigate('/')
          }
            })
            .catch((err) => {
              console.log(err)
              toast({
                position: 'top-right',
                title: 'Login Not Sucessful',
                description: `Please Sign up Firstly`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            navigate('/register');
            })
    }
  return (
    <>
    <WithSubnavigation/>
    {
        alert && (
                <Modal isOpen={alert} onClose={closeModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Signin Successfully Done</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* Your success message can go here */}
                      Congratulations! Your signin was successful.
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={closeModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
        )
    }
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  )
}