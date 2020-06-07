import React from 'react';

import { Container } from './styles';

interface ItemProps {
  title: string,
  src?: string,
  alt?: string,
  selected?: boolean
}

const Item: React.FC<ItemProps> = ({ title, src, alt, selected }) => {
  return (
    <Container className={selected ? 'selected' : undefined}>
      <img src={src} alt={alt} />
      <span>{title}</span>
    </Container>
  );
}

export default Item;
