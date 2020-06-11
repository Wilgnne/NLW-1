import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Alert
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as Location from 'expo-location';

import { GetUFs, GetCitys } from '../../services/ibge';
import openStreetMap, { Address } from '../../services/openStreetMap';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<{ sigla: string, nome: string }[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState<{ sigla: string, nome: string }>({nome: '', sigla: ''});
  const [selectedCity, setSelectedCity] = useState<string>('');

  const [address, setAddress] = useState<Address>({ address: { city: '', state: '' } });

  useEffect(() => {
    GetUFs(setUfs);
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      openStreetMap.get<Address>('reverse', {
        params: {
          format: 'json',
          lat: latitude,
          lon: longitude
        }
      }).then(response => {
        setAddress(response.data);
      });
    }

    loadPosition();
  }, []);

  useEffect(() => {
    const uf = ufs.find(uf => uf.nome === address.address.state);

    if (uf) {
      setSelectedUf(uf);
      setSelectedCity(address.address.city);
    }
  }, [address]);

  function handleUFPicker(value: string) {
    const uf = ufs.find(uf => uf.sigla === value);
    if (uf) {
      setSelectedUf(uf);
      GetCitys(value, setCities);
    }
  }

  function handleCityPicker(value: string) {
    setSelectedCity(value);
  }

  function handleNavigateToPoints() {
    if (selectedCity)
      navigation.navigate('Points', {
        uf: selectedUf,
        city: selectedCity
      });
    else
      Alert.alert('Selecione uma cidade', 'É necessario selecionar uma cidade para continuar.');
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <RNPickerSelect
        style={stylesPicker}
        placeholder={{
          label: "Selecione o estado...",
          value: null,
          color: "#aaa"
        }}
        onValueChange={handleUFPicker}
        value={selectedUf.sigla}
        items={ufs.map(uf => ({ key:uf.sigla, label: uf.sigla, value: uf.sigla }))}
      />
      <RNPickerSelect
        style={stylesPicker}
        placeholder={{
          label: "Selecione a cidade...",
          value: null,
          color: "#aaa"
        }}
        onValueChange={handleCityPicker}
        value={selectedCity}
        items={cities.map(city => ({ key:city, label: city, value: city }))}
      />

      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={handleNavigateToPoints}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon
                name='arrow-right'
                color='#FFF'
                size={24}
              />
            </Text>
          </View>
          <Text style={styles.buttonText} >Entrar</Text>
        </RectButton>
      </View>

    </ImageBackground>
  );
}

const stylesPicker = {
  viewContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 8,
    paddingHorizontal: 8
  },
  placeholder: {
    fontSize: 16
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  button: {
    backgroundColor: '#2C60B5',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: '#204683',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;
