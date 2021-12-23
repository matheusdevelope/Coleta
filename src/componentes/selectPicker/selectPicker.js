import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native';
import Global from '../../global/global';
import Button from '../button/button';
import { ButtonOptions, Container, LineButton, Text, ViewSelectOptions } from './style'

function SelectPicker({ name, options, placeholder, onSelect }) {
    const inputRef = useRef(null);
    const List = useRef(options);
    const [input, setInput] = useState('')
    const [active, setActive] = useState(false)

    function handleOptions(data) {
        data == 'button' ?
            setActive(!active)
            :
            data == 'close' ?
                setActive(false) :
                setActive(true)
    }
    function handleSelected(data) {
        inputRef.current.value = data.label.toString()
        setInput(data.label.toString())
        onSelect(name, data.value.toString())
        handleOptions('button')
    }

    useEffect(() => {
        return () => {
            setActive(false)
        }
    }, [])
    return (
        <Container>
            <LineButton onPress={() => { handleOptions('button') }} activeOpacity={1}
                style={{ display: !active ? 'flex' : 'none' }}>
                <Text style={{ flex: 1, fontSize: Global.fontSize_n, padding: Global.paddingHeightInputs_N }}
                    ref={inputRef}>
                    {input.length > 0 ? input : placeholder}
                </Text>
                <Button name={active ? Global.IconSelectInputOpen : Global.IconSelectInputClose} size={Global.SizeIconSelectInput}
                    color={Global.ColorIconSelectInput} onClick={() => { handleOptions('button') }}
                />
            </LineButton>
            <ViewSelectOptions style={{ display: active ? 'flex' : 'none' }}>
                {
                    List.current.map((item, key) => (
                        <ButtonOptions key={key} onPress={() => { handleSelected(item) }}>
                            <Text >{item.label}</Text>
                        </ButtonOptions>
                    ))
                }
               
            </ViewSelectOptions>
        </Container>
    )
}

export default SelectPicker