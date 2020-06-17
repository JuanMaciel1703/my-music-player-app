import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MusicListItem from './MusicListItem';

export default function MusicList(props) {
    const { musics } = props;

    return(
        <ScrollView style={styles.musicList} >
            {
                musics.map((music) => {
                    return (
                        <MusicListItem 
                            key={music.id}
                            id={music.id}
                            name={music.name} 
                            artist={music.album.artists[0].name} 
                            album={music.album.name} 
                            popularity={music.popularity} 
                            coverArt={music.album.images[0].url}
                            uri={music.preview_url} 
                        />
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    musicList: {
        flex: 1,
        width: '100%',
        paddingVertical:10,
        marginTop: 10,
        backgroundColor: '#222'
    }
});