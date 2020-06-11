import React from 'react';

import { Container } from './styles';

interface ItemProps {
  title: string,
  src?: string,
  alt?: string,
  onClick?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined,
  selected?: boolean
}

const Item: React.FC<ItemProps> = ({ title, src, alt, selected, onClick }) => {
  return (
    <Container
      className={selected ? 'selected' : undefined}
      onClick={onClick}
    >
      <img src={src} alt={alt} />
      <span>{title}</span>
    </Container>
  );
}

export default Item;
