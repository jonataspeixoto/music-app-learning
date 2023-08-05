import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons'
import Player from './Player.js'

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState([]);
  const [songs, setSongs] = useState([
    {
      name: 'Sweet child of mine',
      artist: 'Guns and Roses',
      playing: false,
      file: require('./songs/sample1.mp3')
    },
    {
      name: 'Welcome to the jungle',
      artist: 'Guns and Roses',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    },
    {
      name: 'Welcome to the jungle',
      artist: 'Guns and Roses',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    },
    {
      name: 'Welcome to the jungle',
      artist: 'Guns and Roses',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' }
    },
    {
      name: 'Welcome to the jungle',
      artist: 'Guns and Roses',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
    },
    {
      name: 'Welcome to the jungle',
      artist: 'Guns and Roses',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }
    },
    {
      name: 'This love',
      artist: 'Maroon 5',
      playing: false,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
    },
    {
      name: 'This love',
      artist: 'Maroon 5',
      playing: false,
      file: require('./songs/sample4.mp3')
    },
    {
      name: 'This love',
      artist: 'Maroon 5',
      playing: false,
      file: require('./songs/sample4.mp3')
    },
  ]);

  const changeSong = async (id) => {
    let currentFile = null;
    const newSongs = songs.filter((item, index) => {
      item.playing = !(index == id) || !(currentFile = item.file) ? false : true;
      return item;
    })

    setAudioIndex(id);

    let currentAudio = new Audio.Sound();

    if (audio.length != 0){
      audio.filter(async (song) => {
        await song.pauseAsync();
        await song.unloadAsync();
      })
    }

    try{
      await currentAudio.loadAsync(currentFile);
      await currentAudio.playAsync();
    }catch(error){}
    
    setAudio([currentAudio]);
    setPlaying(true);
    setSongs(newSongs);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" hidden />
        <View style={styles.header}>
          <Text style={styles.txtHeader}>Music App</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.txtTable}>Song:</Text>
          <Text style={styles.txtTable}>Artist:</Text>
        </View>
        {
          songs.map((item, index) => {
            if (item.playing){
              return(
                <View key={index} style={styles.table}>
                  <TouchableOpacity 
                    onPress={() => changeSong(index)}
                    style={styles.rowTable}>
                    <Text style={styles.txtTableSelected}>
                      <AntDesign name='play' size={15} color="#1DB954"/> {item.name}
                    </Text>
                    <Text style={styles.txtTableSelected}>
                      {item.artist}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return(
                <View  key={index} style={styles.table}>
                  <TouchableOpacity 
                    onPress={() => changeSong(index)}
                    style={styles.rowTable}>
                    <Text style={styles.txtTable}>
                      <AntDesign name='play' size={15} color="white"/> {item.name}
                    </Text>
                    <Text style={styles.txtTable}>
                      {item.artist}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })
        }
        <View style={{paddingBottom: 100}}></View>
      </ScrollView>
      <Player 
        playing={playing}
        setPlaying={setPlaying}
        audioIndex={audioIndex}
        setAudioIndex={setAudioIndex}
        songs={songs}
        setSongs={setSongs}
        audio={audio}
        setAudio={setAudio}
        changeSong={changeSong}
      >
      </Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  header: {
    backgroundColor: '#1DB954',
    width: '100%',
    padding: 20
  },
  txtHeader: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  txtTable: {
    width: '50%',
    color: 'rgb(200, 200, 200)'
  },
  txtTableSelected: {
    width: '50%',
    color: '#1DB954'
  },
  rowTable: {
    width: '100%',
    flexDirection: 'row'
  }
});
