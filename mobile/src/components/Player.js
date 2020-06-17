import React, { useState, useContext, useEffect, useReducer } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Audio } from 'expo-av';
import PlayerContext, { reducer } from '../contexts/PlayerContext';
import AsyncStorage from '@react-native-community/async-storage';

import GlobalStyle from '../styles/global';
import { msToTime } from '../util/TimeParser';

const soundObject = new Audio.Sound();

export default function Player() {    
    const context = useContext(PlayerContext);
    const [playerContextState, dispatch] = useReducer(reducer, context)


    const [isPlaying, setIsPlaying] = useState(context.isPlaying)
    const [currentTime, setCurrentTime] = useState(null)
    const [totalTime, setTotalTime] = useState(null)
    const [currentTrack, setCurrentTrack] = useState(context.currentTrack);

    useEffect(() => {
        resolveStoredLastPlayedMusic()
        return () => {}
    }, [])

    soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
            setTotalTime(msToTime(status.playableDurationMillis))
            setCurrentTime(msToTime(status.positionMillis))
        }

        if (status.isLoaded && status.didJustFinish) {
            console.info('FINISHED')
            handleStop()        
        }

        if (status.isLoaded && !status.isPlaying) {
            console.info('IS PLAYING: ', status.isPlaying)
        }
    })

    async function resolveStoredLastPlayedMusic() {
        if (!currentTrack.uri) {
            const lastPlayedTrack = await AsyncStorage.getItem('@last-track-played');
            const resolvedTrack = lastPlayedTrack ? JSON.parse(lastPlayedTrack) : currentTrack;
            setCurrentTrack(resolvedTrack);
        }
    }

    async function handleStop() {
        await soundObject.stopAsync();
        await soundObject.setPositionAsync(0);
        setCurrentTime(null);
        setTotalTime(null);
        setIsPlaying(false);
        context.isPlaying = false;
    }

    async function togglePlayState() {
        const status = await soundObject.getStatusAsync();

        if (!currentTrack.uri && !status.isLoaded) {
            context.isPlaying = false;    
            return null;
        }

        context.isPlaying = !context.isPlaying;
        setIsPlaying(context.isPlaying);
        
        try {
            if (context.isPlaying) {
                if (!status.isLoaded) {
                    await soundObject.loadAsync({uri: currentTrack.uri});
                }
                await soundObject.playAsync()
            } else {
                await soundObject.pauseAsync();
            }
        } catch(error) {
            console.error('Error playing music:')
            console.error(error)
            context.isPlaying = false;
        }
    }

    return (
        <View style={styles.player}>
            <View style={styles.albumData}>
                {
                    currentTrack.coverArt ?
                        <Image style={styles.albumArt} source={{ uri: currentTrack.coverArt}} />
                    :
                    null
                }
                <View style={styles.trackData}>
                    <Text style={styles.trackName}>{currentTrack.name}</Text>
                    <Text style={styles.artist}>{currentTrack.artist}</Text>
                    {
                        currentTime &&
                            <View style={{ flexDirection:'row' }}>
                                <Text style={styles.artist}>{currentTime}</Text>
                                <Text style={styles.artist}> | </Text>
                                <Text style={styles.artist}>{totalTime}</Text>
                            </View>
                    }
                </View>
            </View>
            <View style={styles.buttons}>
                {
                    isPlaying ? 
                    <TouchableOpacity onPress={togglePlayState}>
                        <MaterialIcons name="pause" size={40} color="#fff" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={togglePlayState}>
                        <MaterialIcons name="play-arrow" size={40} color="#fff" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
        flex: 10,
        width: '100%',
        height: 65,
        position: 'absolute',  
        paddingHorizontal: 5,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485460'
    },
    albumData: {
        flex: 9,
        flexDirection: 'row'
    },
    trackData: {
        flex: 2,
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    trackName: {
        color: '#fff',
        fontSize: 16
    },
    artist: {
        color: '#eee',
        fontSize: 12
    },
    albumArt: {
        width: 54,
        height: 54,
        borderWidth: 2,
        borderColor: GlobalStyle.colors.SECOUNDARY_COLOR
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        width: 100,
        paddingHorizontal: 10
    }
});