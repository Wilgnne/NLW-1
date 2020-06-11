import React from 'react';

import { Container } from './styles';

interface FormProps {
  onSubmit?: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined
}

const Form: React.FC<FormProps> = (props) => {
  return (
    <Container
      onSubmit={props.onSubmit}
    >
      {props.children}
    </Container>
  );
}

export default Form;
