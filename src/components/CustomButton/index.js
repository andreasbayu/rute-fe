import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonPrimary = ({title = 'Button', onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonPrimary}>
      <Text style={styles.textButton}> {title} </Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#F49D1A',
    padding: 18,
    borderRadius: 12,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
