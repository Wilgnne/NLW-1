import React from 'react';

import { Container } from './styles';

import Routes from '../routes';

function App() {
  console.log(process.env);
  return (
    <Container>
      {process.env.PUBLIC_URL}
      <Routes />
    </Container>
  );
}

export default App;
