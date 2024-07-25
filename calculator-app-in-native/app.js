import React from 'react';
import { StyleSheet, View } from 'react-native';
import Calculator from './Calculator'; // נתיב נכון לרכיב המחשבון שלך

export default function App() {
  return (
    <View style={styles.container}>
      <Calculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
