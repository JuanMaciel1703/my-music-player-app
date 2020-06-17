import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import GlobalStyle from '../styles/global';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Player from '../components/Player';
import AppContext from '../contexts/AppContext';

import MusicList from '../components/MusicList';

export default function Main() {
  const app = useContext(AppContext);

  const [suggestedMusics, setSuggestedMusics] = useState([])

  useEffect(() => {
    setAccessTokenFromStorage()
    findSuggestedMusics()
    return () => {}
  }, [])

  async function setAccessTokenFromStorage() {
    if (!app.accessToken) {
      app.accessToken = await AsyncStorage.getItem('@access_token');
    }
    
    if (!app.refreshToken) {
      app.refreshToken = await AsyncStorage.getItem('@refresh_token')
    }
  }

  async function findSuggestedMusics() {
    if (suggestedMusics.length > 0) {
      return null;
    }

    try {
      const response = await api.get('/songs/suggested');
      setSuggestedMusics(response.data.items);
    } catch (error) {
      console.error('ERROR FETCHING SUGGESTED');
      console.error(error);
      setSuggestedMusics([]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Músicas, artistas, albuns..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        >

        </TextInput>
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <MaterialIcons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <MusicList musics={suggestedMusics}/>
      </View>
      <View style={styles.player}>
        <Player/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    color: '#FFF',
    backgroundColor: GlobalStyle.colors.SECOUNDARY_COLOR
  },
  searchForm: {
    flex: 1,
    top: 20,
    zIndex: 10,
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  mainContent: {
    flex: 8,
    paddingVertical: 0
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#eee',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 1
  },
  searchButton: {
    width: 50, 
    height: 50,
    backgroundColor: GlobalStyle.colors.PRIMARY_COLOR,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  player: {
    flex: 1
  }
});