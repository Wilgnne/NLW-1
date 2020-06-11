import React from 'react';

import { Container } from './styles';

const Grid: React.FC = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

export default Grid;
