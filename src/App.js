import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChatBox } from './ChatBox';

function App() {
  const [home, setHome] = useState(true);
  return <Box
    bgColor='rgb(30,30,30)'
    minH='100vh'
    display='flex'
    flexDir={home ? 'column' : 'row'}
    alignItems='center'
  >
    <Box display='flex' flexDir='column' alignItems='center' marginLeft={home ? '' : '45px'}>
      <Text color='white' fontSize={home ? '8rem' : '6rem'} marginTop={home ? '17.5%' : '-20%'}>Chatter</Text>
      <Text color='gray' fontSize='2rem'>The solution to 'most' of your problems ;)</Text>
    </Box>
    <Box
      className='button'
      color='white'
      bgColor='gray'
      fontSize='3rem'
      marginTop='5%'
      borderRadius='100px'
      padding='5px 17px'
      paddingBottom='12px'
      display={home ? '' : 'none'}
      _hover={{ cursor: 'pointer', color: 'grey', bgColor: 'white' }}
      onClick={() => setHome(false)}
    >
      Try Chatter
    </Box>
    {!home && <ChatBox setHome={setHome} />}
  </Box>
}

export default App;




// import { Box } from "./Box";

// const [green, setGreen] = useState([]);
// const [val, setVal] = useState(false);
// let arr1 = [0, 1, 2], arr2 = [3, 4, 5], arr3 = [6, 7, 8];

// const change = (num) => {
//   if (!green.includes(num)) {
//     if (green.length === 8)
//       setVal(true);
//     setGreen([...green, num]);
//   }
// }

// return <div className="App">
//   <div>
//     {arr1.map(i => <Box key={i} i={i} change={change} val={val} green={green} setGreen={setGreen} />)}
//   </div>
//   <div>
//     {arr2.map(i => <Box key={i} i={i} change={change} val={val} green={green} setGreen={setGreen} />)}
//   </div>
//   <div>
//     {arr3.map(i => <Box key={i} i={i} change={change} val={val} green={green} setGreen={setGreen} />)}
//   </div>
// </div>