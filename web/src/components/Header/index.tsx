import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons/lib/cjs';

import { Container } from './styles';


interface LinkProps {
  to: string,
  text: string,
  icon?: IconType,
}

interface HeaderProps {
  logo: string,
  alt: string,
  linkProps?: LinkProps
}

const Header: React.FC<HeaderProps> = ({ logo, alt, linkProps }) => {
  return (
    <Container>
      <img src={logo} alt={alt} />

      {
        linkProps ?
          <Link
            to={linkProps.to}
          >
            {linkProps.icon ? <linkProps.icon /> : <></>}
            {linkProps.text}
          </Link> : <></> }
    </Container>
  );
}

export default Header;
