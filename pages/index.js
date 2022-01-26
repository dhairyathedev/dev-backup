import { Text } from '@nextui-org/react';
import React from 'react';
import InputComponent from '../component/InputComponent';

export default function Home() {

  return <div>
    <Text h1 size={50} css={{
      textAlign: 'center',
      marginTop: '20px',
      marginBottom: '40px',
    }}>
      DEV Backup
    </Text>
   <InputComponent />
  </div>;
}
