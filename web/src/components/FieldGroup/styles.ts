import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;

  .field + .field {
    margin-left: 24px;
  }

  input + input {
    margin-left: 24px;
  }
`;

export { Container };
