import { Box, Button, Input, Spinner, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import OpenAI from 'openai';
import { IoMdSend } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';

const OPENAI_API_KEY = '';

export const ChatBox = ({ setHome }) => {
    const toast = useToast();
    const [latest, setLatest] = useState();
    const [loading, setLoading] = useState();
    const [temp, setTemp] = useState([]);

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const submitHandler = async () => {
        if (!latest)
            return;
        setLoading(true);
        try {
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [...temp, { "role": "user", "content": `${latest}` }]
            });
            setTemp([...temp, { "role": "user", "content": `${latest}` }, { "role": "assistant", "content": `${chatCompletion.choices[0].message.content}` }])
            console.log(chatCompletion.choices[0].message.content);
        }
        catch (error) {
            toast({
                title: "Error!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }
        setLoading(false);
    }

    return <Box
        marginLeft='auto'
        marginRight='5%'
        width='40%'
        borderRadius='50px'
        height='90vh'
        bgColor='black'
        color='white'
        display='flex'
        flexDir='column'
    >
        <Box display='flex'>
            <Tooltip label='Back' color='black' bgColor='white' borderRadius='100px' padding='2px 5px'>
                <Button
                    margin='15px'
                    marginRight='auto'
                    border={0}
                    bgColor='rgb(30,30,30)'
                    borderRadius='100px'
                    width='5vw'
                    h='5vw'
                    onClick={() => setHome(true)}
                    _hover={{ cursor: 'pointer' }}
                >
                    <BiArrowBack size='40px' color='white' />
                </Button>
            </Tooltip>
            <Tooltip label='Delete Session History' color='white' bgColor='red' borderRadius='100px' padding='2px 5px'>
                <Button
                    margin='15px'
                    border={0}
                    bgColor='rgb(30,30,30)'
                    borderRadius='100px'
                    width='5vw'
                    h='5vw'
                    marginLeft='auto'
                    onClick={() => setTemp([])}
                    _hover={{ cursor: 'pointer' }}
                >
                    <MdDelete size='40px' color='white' />
                </Button>
            </Tooltip>
        </Box>
        <Box
            padding='10px 15px'
            overflow='scroll'
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'transparent',
                    borderRadius: '24px'
                }
            }}
            _hover={{
                '&::-webkit-scrollbar-thumb': {
                    background: '#189AB4',
                    borderRadius: '24px'
                }
            }}
            display='flex'
            flexDir='column'
            justifyContent='space-between'
        >
            {temp && temp.map(t => {
                return <Box
                    bgColor={t.role === 'user' ? 'rgb(17, 161, 113)' : 'rgb(85, 80, 80)'}
                    marginLeft={t.role === 'user' ? 'auto' : ''}
                    maxWidth='60%'
                    borderRadius='20px'
                    padding='5px'
                    marginTop='10px'
                >
                    <Text color={t.role === 'user' ? 'black' : 'lightcoral'}>{t.role === 'user' ? 'You' : 'Chatter'}</Text>
                    <Text fontSize='1rem'>{t.content}</Text>
                </Box>
            })}
        </Box>
        {loading ? <Box
            bgColor='rgb(17, 161, 113)'
            marginLeft='auto'
            maxWidth='60%'
            borderRadius='20px'
            padding='5px'
            marginTop='10px'
        >
            <Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' />
            <Text color='black'>You</Text>
            <Text fontSize='1rem'>{latest}</Text>
        </Box> : ''}
        <Box marginTop='auto' display='flex' padding='15px'>
            <Input variant='flushed'
                placeholder='Chat with Chatter'
                letterSpacing={0.01}
                _placeholder={{ fontSize: '2rem' }}
                fontSize='2rem'
                height='3rem'
                padding='15px'
                width='85%'
                type='text'
                outline='none'
                border={0}
                borderLeftRadius='100px'
                bgColor='rgb(30,30,30)'
                color='white'
                onChange={(e) => setLatest(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        submitHandler();
                }}
            />
            <Button
                border={0}
                bgColor='rgb(30,30,30)'
                borderRightRadius='100px'
                width='15%'
                marginLeft='auto'
                onClick={submitHandler}
                _hover={{ cursor: 'pointer' }}
            >
                <IoMdSend size='40px' color='white' />
            </Button>
        </Box>
    </Box>
}


// export const Box = ({ i, change, val, green, setGreen }) => {
//     const [col, setCol] = useState('');
//     if (green.length > 0);
//     console.log(green[0], " ", i);
//     setTimeout(() => {
//         if (val && green.length > 0 && green[0] === i) {
//             setCol('orange');
//             setGreen(temp => temp.filter(j => j !== i));
//         }
//     }, 1000);

//     return <div id={i} className='Box' style={{ backgroundColor: col }} onClick={() => {
//         setCol('green');
//         if (col === '')
//             change(i);
//     }} />
// }