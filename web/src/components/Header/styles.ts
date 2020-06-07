import styled from 'styled-components';

const Container = styled.header`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: var(--title-color);
    font-weight: bold;
    text-decoration: none;

    display: flex;
    align-items: center;
  }

  a svg {
    margin-right: 16px;
    color: var(--primary-color);
  }
`;

export { Container };
