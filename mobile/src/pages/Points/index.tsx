import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  AppState,
  Alert
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import openStreetMap, { Address } from '../../services/openStreetMap';
import api from '../../services/api';

const Points: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routerParams = route.params as { uf: { sigla: string }, city: string };

  const [items, setItems] = useState<{
    id: number,
    title: string,
    image_url: string
  }[]>([]);

  const [points, setPoints] = useState<{
    id: number,
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string
  }[]>([]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    openStreetMap.get<{ lat: string, lon: string }[]>('/', {
      params: {
        format: 'json',
        limit: 1,
        country: 'Brazil',
        state: routerParams.uf.sigla,
        city: routerParams.city
      }
    }).then(response => {
      setInitialPosition([Number(response.data[0].lat), Number(response.data[0].lon)])
    });
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: routerParams.city,
        uf: routerParams.uf.sigla,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    });
  }, [selectedItems]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' color='#2C60B5' size={20} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
        <View style={styles.mapContainer} >
          {
            initialPosition[0] !== 0 && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.06,
                  longitudeDelta: 0.06
                }}
              >

                {
                  points.map(point => (
                    <Marker
                      key={String(point.id)}
                      style={styles.mapMarker}
                      coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude,
                      }}
                      onPress={() => handleNavigateToDetail(point.id)}
                    >
                      <View style={styles.mapMarkerContainer}>
                        <Image
                          style={styles.mapMarkerImage}
                          source={{
                            uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&q=50'
                          }}
                        />
                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                      </View>
                    </Marker>
                  ))
                }


              </MapView>
            )
          }
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20
          }}
        >
          {items.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
              activeOpacity={0.6}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={`${api.defaults.baseURL}${item.image_url}`} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#2C60B5',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#204683',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;
