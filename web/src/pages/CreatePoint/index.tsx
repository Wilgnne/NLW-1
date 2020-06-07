import React, { useState, useEffect, ChangeEvent } from 'react';
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

import api, { ApiItem } from '../../services/api';
import { GetUFs, GetCitys } from '../../services/ibge';

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<ApiItem[]>([]);

  const [ufs, setUFs] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState<string>('0');

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('0');

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    GetUFs(setUFs);
  }, []);

  useEffect(() => {
    if (selectedUF === '0')
      return

    GetCitys(selectedUF, setCities);
  }, [selectedUF]);

  function handleSelectUF(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedUF(e.target.value);
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(e.target.value);
  }

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
              value={selectedUF}
              options={['Selecione uma UF', ...ufs]}
              labelText='Estado (UF)'
              onChange={handleSelectUF}
            />

            <Field
              name='city'
              type='select'
              value={selectedCity}
              options={['Selecione uma cidade', ...cities]}
              labelText='Cidade'
              onChange={handleSelectCity}
            />
          </FieldGroup>
        </Fieldset>

        <Fieldset title='Ítens de Coleta' subtitle='Selecione um ou mais ítens abaixo'>
          <Grid>
            {items.map((item, index) =>
              (
                <Item
                  key={index}
                  title={item.title}
                  src={item.image_url}
                  alt={item.title}
                />
              )
            )}
          </Grid>
        </Fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
}

export default CreatePoint;
