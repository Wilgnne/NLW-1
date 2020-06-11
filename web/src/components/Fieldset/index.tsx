import React from 'react';

import { Container } from './styles';

interface FieldsetProps {
  title: string,
  subtitle?: string
}

const Fieldset: React.FC<FieldsetProps> = (props) => {
  return (
    <Container>
      <legend>
        <h2>{props.title}</h2>
        <span>{props.subtitle}</span>
      </legend>
      {props.children}
    </Container>
  );
}

export default Fieldset;
