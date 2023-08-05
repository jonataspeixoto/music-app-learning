import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons'


export default function App() {

  const [audio, setAudio] = useState(null);
  const [songs, setSongs] = useState([
    {
      name: 'Sweet child of mine',
      artist: 'Guns and Roses',
      playing: true,
      file: ''
    },
    {
      name: 'Welcome to the jungle',
      artist: 'Guns and Roses',
      playing: false,
      file: ''
    },
    {
      name: 'This love',
      artist: 'Maroon 5',
      playing: false,
      file: ''
    }
  ]);

  const changeSong = (id) => {
    let newSongs = songs.filter((item, index) => {
      item.playing = (index == id) ? true : false
      return item
    })

    setSongs(newSongs);
  }

  return (
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
              <View style={styles.table}>
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
              <View style={styles.table}>
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
    </ScrollView>
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
