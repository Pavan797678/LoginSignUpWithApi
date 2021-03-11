import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default function Loader({isLoading}) {
  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#2a90e7" />
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: 'rgba(0, 0, 0,0.2)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
