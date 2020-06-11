import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, Content, Main } from './styles';

import logo from '../../assets/logo.svg';
import Header from '../../components/Header';

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header
          logo={logo}
          alt="Ecoleta"
        />

        <Main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
          <Link to='/create'>
            <span><FiLogIn /></span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </Main>
      </Content>
    </Container>
  );
}

export default Home;
