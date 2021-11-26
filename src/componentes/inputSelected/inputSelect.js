import React, { useRef, useEffect, useCallback, useState } from 'react';
import { TextInput, FlatList } from 'react-native';
import { useField } from '@unform/core';
import Global from '../../global/global';
import Button from '../button/button';
import { ButtonOptions, Container, LineButton, Text, ViewSelectOptions } from './style';
import { GetValuesInputSelect } from '../../services/routesdb';

function InputSelect({ name, onChangeText, options, placeholder, editable, SetDataHideFields, ...rest }) {
    const inputRef = useRef(null);
    const [input, setInput] = useState('')
    const [active, setActive] = useState(false)
    const [data, setdata] = useState([])
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const optionsfiltered = editable ?
        data.filter(data => data.label.toLowerCase().includes(input.toLowerCase()))
        :
        data
    async function GetData() {
        const ret = await GetValuesInputSelect(options)
        setdata(ret)
    }
    function SetDataAnotherInput(data) {
        SetDataHideFields(data, options.nameFieldHide)
    }
    function handleOptions(data) {
        data == 'button' ?
            setActive(!active)
            :
            data == 'close' ?
                setActive(false) :
                setActive(true)
    }
    function handleSelected(data) {
        setInput(data.label.toString())
        inputRef.current.value = data.label.toString()
        SetDataAnotherInput(data.value.toString())
        handleOptions('button')
    }
    const handleChangeText = useCallback(
        text => {
            if (inputRef.current) inputRef.current.value = text;
            if (onChangeText) onChangeText(text);
            setInput(text)
        },
        [onChangeText],
    );
    useEffect(() => {
        GetData()
    }, [])
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
            <ViewSelectOptions style={{ display: active ? 'flex' : 'none' }}>
                <FlatList
                    data={optionsfiltered}
                    renderItem={({ item }) => (
                        <ButtonOptions onPress={() => { handleSelected(item) }}>
                            <Text >{item.label}</Text>
                        </ButtonOptions>
                    )}
                    keyExtractor={item => item.value}
                />
            </ViewSelectOptions>
        </Container>
    );
}
export default InputSelect;
