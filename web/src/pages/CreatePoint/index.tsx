import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

import logo from '../../assets/logo.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';

import Fieldset from '../../components/Fieldset';
import FieldGroup from '../../components/FieldGroup';
import Field from '../../components/Field';

import Maps from '../../components/Maps';

import Grid from '../../components/Grid';
import Item from '../../components/Grid/Item';

const CreatePoint: React.FC = () => {
  return (
    <Container>
      <Header
        logo={logo}
        alt="Ecoleta"
        linkProps={{
          to: '/',
          text: 'Voltar para home',
          icon: FiArrowLeft
        }}
      />

      <Form>
        <h1>Cadastro do <br /> ponto de coleta</h1>
        <Fieldset title='Dados'>
          <Field
            name='name'
            type='text'
            labelText='Nome da entidade'
          />
          <FieldGroup>
            <Field
              name='email'
              type='email'
              labelText='E-mail'
            />

            <Field
              name='whatsapp'
              type='text'
              labelText='Whatsapp'
            />
          </FieldGroup>
        </Fieldset>

        <Fieldset title='Endereço' subtitle='Selecione o endereço no mapa'>
          <Maps>

          </Maps>
          <FieldGroup>
            <Field
              name='uf'
              type='select'
              options={['Selecione uma UF']}
              labelText='Estado (UF)'
            />

            <Field
              name='city'
              type='select'
              options={['Selecione uma cidade']}
              labelText='Cidade'
            />
          </FieldGroup>
        </Fieldset>

        <Fieldset title='Ítens de Coleta' subtitle='Selecione um ou mais ítens abaixo'>
          <Grid>
            <Item
              title='Óleo de Cozinha'
              src='http://localhost:3333/uploads/baterias.svg'
            />
            <Item
              title='Óleo de Cozinha'
              src='http://localhost:3333/uploads/baterias.svg'
            />
            <Item
              title='Óleo de Cozinha'
              src='http://localhost:3333/uploads/baterias.svg'
              selected={true}
            />
            <Item
              title='Óleo de Cozinha'
              src='http://localhost:3333/uploads/baterias.svg'
            />
            <Item
              title='Óleo de Cozinha'
              src='http://localhost:3333/uploads/baterias.svg'
            />
            <Item
              title='Óleo de Cozinha'
              src='http://localhost:3333/uploads/baterias.svg'
            />
          </Grid>
        </Fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
}

export default CreatePoint;
