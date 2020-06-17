import React, { useContext, useReducer } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PlayerContext, { reducer } from '../contexts/PlayerContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MusicList(props) {
    const playerContext = useContext(PlayerContext);
    const [playerContextState, dispatch] = useReducer(reducer, playerContext)
    const { id, name, artist, album, popularity, coverArt, uri } = props;

    async function changeTrack() {
        dispatch({ type: 'change_track', trackData: { id, name, artist, coverArt, uri }});
    }

    return(
        <View style={styles.item}>
            <View style={styles.albumData}>
                <Image style={styles.albumArt} source={{ uri: coverArt}} />
                <View style={styles.trackData}>
                    <Text style={styles.trackName}>
                        {name.substring(0, 30)}
                    </Text>
                    <Text style={styles.artist}>
                        {artist.substring(0, 30)}
                        </Text>
                    <Text style={styles.artist}>
                        {album.substring(0, 35)}
                    </Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={changeTrack}>
                    <MaterialIcons name="play-arrow" size={40} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 10,
        width: '100%',
        height: 90,
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#555',
        elevation: 5
    },
    albumData: {
        flex: 9,
        flexDirection: 'row'
    },
    trackData: {
        flex: 10,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    trackName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    artist: {
        color: '#eee',
        fontSize: 12
    },
    albumArt: {
        width: 90,
        height: 90
    },
    buttons: {
        top: 25,
        paddingHorizontal: 5
    }
});