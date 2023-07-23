import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" hidden />
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Music App</Text>
      </View>
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
  }
});
