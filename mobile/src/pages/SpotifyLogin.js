import React, { useContext } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-community/async-storage';
import AppContext from '../contexts/AppContext';

export default function SpotifyLogin({ navigation }) {
    const context = useContext(AppContext);

    async function handleOnMessage(event) {
        var parsedData = JSON.parse(event.nativeEvent.data)
        
        try {
            await AsyncStorage.setItem('@access_token', parsedData.access_token)
            await AsyncStorage.setItem('@refresh_token', parsedData.refresh_token)

            context.accessToken = parsedData.access_token
            context.refreshToken = parsedData.refresh_token

            navigation.navigate('App')
          } catch (e) {
            console.log('ERROR')
          }
    }

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: "http://192.168.0.25:3000/auth/login"
                }}
                onMessage={handleOnMessage}
            />
        </View>
    );
}