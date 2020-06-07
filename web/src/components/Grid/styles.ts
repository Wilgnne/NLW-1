import styled from 'styled-components';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

  .selected {
    background: #E1FAEC;
    border: 2px solid #34CB79;
  }
`;

export { Container };
