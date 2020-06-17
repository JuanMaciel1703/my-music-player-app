import React, { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const defaultValue = {
    isPlaying: false,
    currentTrack: {
        id: '',
        name: '',
        artist: '',
        coverArt: '',
        uri: ''
    },
    queue: {
        tracks:[]
    },
    changeTrack: async (trackData) => {
        self.currentTrack = {
            ...trackData
        }

        await AsyncStorage.setItem("@last-track-played", JSON.stringify(self.currentTrack))
    }
}

const PlayerContext = createContext(defaultValue);

function reducer(state, action) {
    switch(action.type) {
        case 'change_track': 
            state.currentTrack = action.trackData
            return state.changeTrack(action.trackData)
        break;
        default:
            return null;
    }
}

export { defaultValue, reducer }

export default PlayerContext