import React from 'react';
import { Div, Text } from '@atoms/basics';

const NotFound: React.FC = () => {
  return (
    <Div w='100%' h='100vh' fJustify='center' fAlign='center'>
      <Div fJustify='center' fAlign='center' fDir='column'>
        <Text as='h1' tVariant='h2' tAlign='center'>
          404
        </Text>
        <Text as='h1' tVariant='subitile1' tAlign='center'>
          NOT FOUND
        </Text>
      </Div>
    </Div>
  );
};

export default NotFound;
