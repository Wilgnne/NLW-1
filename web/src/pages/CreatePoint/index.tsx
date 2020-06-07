import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';

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
  const history = useHistory();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [items, setItems] = useState<ApiItem[]>([]);

  const [ufs, setUFs] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState<string>('0');

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('0');

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

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

  function handleMapClick(e: LeafletMouseEvent) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.includes(id);

    if (alreadySelected) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    };

    await api.post('points', data);
    alert('Ponto de coleta cadastrado');

    history.push('/');
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

      <Form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>
        <Fieldset title='Dados'>
          <Field
            name='name'
            type='text'
            labelText='Nome da entidade'
            onChange={handleInputChange}
          />
          <FieldGroup>
            <Field
              name='email'
              type='email'
              labelText='E-mail'
              onChange={handleInputChange}
            />

            <Field
              name='whatsapp'
              type='text'
              labelText='Whatsapp'
              onChange={handleInputChange}
            />
          </FieldGroup>
        </Fieldset>

        <Fieldset title='Endereço' subtitle='Selecione o endereço no mapa'>
          <Maps
            center={initialPosition}
            zoom={13}
            markings={[selectedPosition]}
            onClick={handleMapClick}
          >

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
            {items.map(item =>
              (
                <Item
                  key={item.id}
                  title={item.title}
                  src={item.image_url}
                  alt={item.title}
                  selected={selectedItems.includes(item.id)}
                  onClick={() => handleSelectItem(item.id)}
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
