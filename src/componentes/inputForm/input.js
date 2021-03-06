import React, { useRef, useEffect, useCallback } from 'react';
import { Text, TextInput } from 'react-native';
import { useField } from '@unform/core';
import Global from '../../global/global';

function Input({ name, label, onChangeText, expansive,UpperCase, style ,...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value});
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);
  const handleChangeText = useCallback(
    text => {
      let copy = ''
      UpperCase ?
      copy = text.toUpperCase() :
      copy = text
      if (inputRef.current) inputRef.current.value = copy;
      if (onChangeText) onChangeText(copy);
    },
    [onChangeText],
  );
  return (
    <>
      {label && <Text>{label}</Text>}
      <TextInput 
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        placeholderTextColor={Global.colorPlaceholder}
        autoCorrect={false}
        autoCapitalize={'characters'}
        {...rest}
        style={[style,{backgroundColor:error?error:Global.backgroundInputs}]}
      />
    </>
  );
}
export default Input;

