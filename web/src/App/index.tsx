import React from 'react';

import { Container } from './styles';

import Routes from '../routes';

function App() {
  return (
    <Container>
      {process.env.PUBLIC_URL}
      <Routes />
    </Container>
  );
}

export default App;
