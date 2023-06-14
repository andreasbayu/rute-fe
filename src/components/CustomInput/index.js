import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = ({
  placeholder,
  value,
  secureTextEntry,
  styles,
  onChangeText,
}) => {
  return (
    <View style={styles}>
      <TextInput
        style={style.root}
        placeholder={placeholder}
        value={value}
        autoCapitalize={false}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomInput;

const style = StyleSheet.create({
  root: {
    width: '100%',
    borderColor: '#000000',
    padding: 16,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    fontWeight: '700',
  },
});
