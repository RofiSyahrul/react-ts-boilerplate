import React from 'react';
import { Div, Text } from '@atoms/basics';

const Home: React.FC = () => {
  return (
    <Div w='100%' h='100vh' fJustify='center' fAlign='center'>
      <Text as='h1' fSize='34px' weight='bold' tAlign='center'>
        Homepage
      </Text>
    </Div>
  );
};

export default Home;
