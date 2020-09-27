import React from 'react';
import { Div, Text } from '@atoms/basics';
import { useAxiosGet } from '@hooks/axios';

const Home: React.FC = () => {
  const { data, loading, error } = useAxiosGet({
    endpoint: '/pokemon',
    kind: 'list',
    withImage: true,
    params: { limit: 20, offset: 0 },
  });

  return (
    <Div
      w='100%'
      h='100vh'
      fJustify={data ? 'flex-start' : 'center'}
      fAlign={data ? 'flex-start' : 'center'}
    >
      <Text
        as={!loading && !error ? 'pre' : undefined}
        tVariant='body1'
        tAlign={data ? 'left' : 'center'}
      >
        {loading ? (
          'Loading....'
        ) : error ? (
          error.message
        ) : (
          <code>{JSON.stringify(data, null, 2)}</code>
        )}
      </Text>
    </Div>
  );
};

export default Home;
