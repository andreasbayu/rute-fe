import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';

const ButtonPrimary = ({
  title = 'Button',
  loading = false,
  disabled = false,
  onPress = () => {},
}) => {
  return (
    <Button
      onPress={onPress}
      containerStyle={styles.buttonPrimary}
      loading={loading}
      disabled={loading}
      title="Login"
      color="#ec2d01"
    />
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  buttonPrimary: {
    borderRadius: 4,
  },
});
