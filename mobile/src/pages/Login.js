import React, { useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({ navigation }) {
    async function handleLoginSpotify(){
      navigation.navigate('SpotifyLogin')
    }

    useEffect(() => {
      checkAccessToken()
    }, [])

    async function checkAccessToken(){
      const isLogged = await AsyncStorage.getItem('@access_token');
      if (isLogged) {
        navigation.navigate('Main')
      }
    }

    return (
        <View style={styles.container}>
          <Button
              title="Login Spotify"
              onPress={handleLoginSpotify}
          >
          </Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF'
  },
});
