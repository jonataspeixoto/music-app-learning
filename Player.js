import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons'


export default function Player(props) {


    const handePlay = async () => {
        
        let currentFile = props.songs[props.audioIndex].file; 

        const newSongs = props.songs.filter((item, index) => {
            item.playing = !(index == props.audioIndex) || !(currentFile = item.file) ? false : true;
            return item;
        })
        
        try{
            props.setPlaying(true);
            props.setSongs(newSongs);
            if (props.audio != null){
                await props.audio.playAsync();
            } else {
                let currentAudio = new Audio.Sound();
                await currentAudio.loadAsync(currentFile);
                await currentAudio.playAsync();
                props.setAudio(currentAudio);
            }
        }catch(error){}
    }

    const handePause = async () => {
        if(props.audio != null){
            props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }

    return (
        <View style={styles.player}>
            <TouchableOpacity style={{marginHorizontal: 20}}>
                <AntDesign name="banckward" size={35} color="white"/>
            </TouchableOpacity>

            {
                (!props.playing) ? 
                <TouchableOpacity onPress={() => handePlay()} style={{marginHorizontal: 20}}>
                    <AntDesign name="playcircleo" size={35} color="white"/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => handePause()} style={{marginHorizontal: 20}}>
                    <AntDesign name="pausecircleo" size={35} color="white"/>
                </TouchableOpacity>
            }

            <TouchableOpacity style={{marginHorizontal: 20}}>
                <AntDesign name="forward" size={35} color="white"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})