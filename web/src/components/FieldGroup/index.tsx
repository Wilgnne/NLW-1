import React from 'react';

import { Container } from './styles';

const FieldGroup: React.FC = (porps) => {
  return (
    <Container>
      {porps.children}
    </Container>
  );
}

export default FieldGroup;
