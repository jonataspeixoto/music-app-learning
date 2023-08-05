import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons'


export default function Player(props) {

    const handleBanckward = async () => {
        console.log("handeBanckward");
        let newIndex = props.audioIndex <= 0 ? props.songs.length - 1 : props.audioIndex - 1;
        await props.changeSong(newIndex);
    }

    const handleForward = async () => {
        console.log("handeForward")
        let newIndex = props.audioIndex >= props.songs.length - 1 ? 0 : props.audioIndex + 1;
        await props.changeSong(newIndex);
    }

    const handlePlay = async () => {
        console.log("play")

        let currentFile = props.songs[props.audioIndex].file; 

        const newSongs = props.songs.filter((item, index) => {
            item.playing = !(index == props.audioIndex) || !(currentFile = item.file) ? false : true;
            return item;
        })
        
        try{
            if (props.audio.length != 0){
                props.audio.filter(async (song) => {
                    await props.song.playAsync();
                })
            } else {
                let currentAudio = new Audio.Sound();
                await currentAudio.loadAsync(currentFile);
                await currentAudio.playAsync();
                props.setAudio([currentAudio]);
            }
            props.setPlaying(true);
            props.setSongs(newSongs);
        }catch(error){}
    }

    const handlePause = async () => {
        console.log("pause")
        if(props.audio.length != 0){
            props.audio.filter((song) => {
                song.pauseAsync();
            })
        }
        props.setPlaying(false);
    }

    return (
        <View style={styles.player}>
            <TouchableOpacity onPress={() => handleBanckward()} style={{marginHorizontal: 20}}>
                <AntDesign name="banckward" size={35} color="white"/>
            </TouchableOpacity>

            {
                (!props.playing) ? 
                <TouchableOpacity onPress={() => handlePlay()} style={{marginHorizontal: 20}}>
                    <AntDesign name="playcircleo" size={35} color="white"/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => handlePause()} style={{marginHorizontal: 20}}>
                    <AntDesign name="pausecircleo" size={35} color="white"/>
                </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => handleForward()} style={{marginHorizontal: 20}}>
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