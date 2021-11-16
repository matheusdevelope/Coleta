import React, { useRef, useEffect, useCallback, useState } from 'react';
import { TextInput, ScrollView, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useField } from '@unform/core';
import Global from '../../global/global';
import Button from '../button/button';
import { ButtonOptions, Container, LineButton, Text, ViewSelectOptions } from './style';


function InputSelect({ name, onChangeText, options, placeholder, editable, ...rest }) {
    const [input, setInput] = useState('')
    const [active, setActive] = useState(false)

    const optionsfiltered = editable ?
        options.filter(data => data.value.toLowerCase().includes(input.toLowerCase()))
        :
        options

    function handleOptions(data) {
        data == 'button' ?
            setActive(!active)
            :
            data == 'close' ?
                setActive(false) :
                setActive(true)
    }
    function handleSelected(data) {
        setInput(data)
        inputRef.current.value = data
        handleOptions('button')
    }
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
                    inputRef.current.setNativeProps({ text: value });
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
            if (inputRef.current) inputRef.current.value = text;
            if (onChangeText) onChangeText(text);
            setInput(text)
        },
        [onChangeText],
    );

    return (
        <Container>
            <LineButton>
                <TextInput style={{ flex: 1, fontSize: Global.fontSize_n, padding: Global.paddingHeightInputs_N }}
                    ref={inputRef}
                    onChangeText={handleChangeText}
                    defaultValue={defaultValue}
                    placeholderTextColor={Global.colorPlaceholder}
                    autoCorrect={false}
                    onFocus={() => { handleOptions('open') }} value={input}
                    placeholder={placeholder}
                    editable={editable == undefined ? false : true}
                    {...rest}
                />

                <Button name={active ? Global.IconSelectInputOpen : Global.IconSelectInputClose} size={Global.SizeIconSelectInput}
                    color={Global.ColorIconSelectInput} onClick={() => { handleOptions('button') }}
                />
            </LineButton>
            <ViewSelectOptions style={{ display: active ? 'flex' : 'none' }}            >
                {/* <ViewSelectOptions style={{ display: active ? 'flex' : 'none' }}> */}
                <ScrollView >
                    {optionsfiltered.map((data, key) => {
                        return (
                            <ButtonOptions key={key} onPress={() => { handleSelected(data.value) }}>
                                <Text >{data.label}</Text>
                            </ButtonOptions>
                        )
                    })}
                </ScrollView>

            </ViewSelectOptions>
        </Container>
    );
}
export default InputSelect;

export const styles = StyleSheet.create({
    //     style: {
    //         maxHeight: Global.MaxHeigtOptionsSelect,
    //         borderRadius: 4,//Global.borderRadius,
    //         backgroundColor: Global.white,
    //          //margin:0  1  0 Global.marginInputs,
    //          position: 'absolute',
    //          bottom: -(Global.MaxHeigtOptionsSelect + 2),//-Global.MaxHeigtOptionsSelect,
    //          right: 4,
    //          left: 0,
    //          zIndex: 4,
    //         elevation: 5,
    //     }
    style: {
        shadowColor: 'gery',
        backgroundColor: 'white',
        padding: 18,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

        // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 18,
        shadowOpacity: 0.2,
        borderRadius: 12,

        // Android
        elevation: 8,
        position: 'absolute',
        //          bottom: -(Global.MaxHeigtOptionsSelect + 2),//-Global.MaxHeigtOptionsSelect,
        //          right: 4,
        //          left: 0,
        //          zIndex: 4,


    },
    style1: {
        shadowColor: 'gery',
        backgroundColor: 'white',
        padding: 18,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

        // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 18,
        shadowOpacity: 0.2,
        borderRadius: 12,

        // Android
        elevation: 10,
        position: 'absolute',
        //          bottom: -(Global.MaxHeigtOptionsSelect + 2),//-Global.MaxHeigtOptionsSelect,
        //          right: 4,
        //          left: 0,
        //          zIndex: 4,


    }
    ,
    style2: {
        shadowColor: 'gery',
        backgroundColor: 'white',
        padding: 18,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

        // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 18,
        shadowOpacity: 0.2,
        borderRadius: 12,

        // Android
        elevation: 12,
        position: 'absolute',
        //          bottom: -(Global.MaxHeigtOptionsSelect + 2),//-Global.MaxHeigtOptionsSelect,
        //          right: 4,
        //          left: 0,
        //          zIndex: 4,

    }
});

