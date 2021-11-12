import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Global from '../../global/global';
import Button from '../button/button';
import Input from '../input/input';
import { ButtonOptions, Container, LineButton, Text, ViewSelectOptions } from './style';

const InputSelect = ({ options, placeholder, onSelected }) => {

    const [input, setInput] = useState('')
    const [active, setActive] = useState(false)
    const OptionsFiltered = options.filter(data => data.value.toLowerCase().includes(input.toLowerCase()))

    function handleOptions(data) {
        data == 'button' ?
            setActive(!active) :
            data == 'close' ?
                setActive(false) :
                setActive(true)
    }
    function handleSelected(data) {
        setInput(data)
        handleOptions('button')
        onSelected(data)
    }
    return (
        <Container>
            <LineButton>
                <Input onFocus={() => { handleOptions('open') }} value={input}
                    placeholder={placeholder} changeText={setInput}
                    placeholderTextColor={Global.colorPlaceholder} />
                <Button name={Global.IconSelectInput} size={Global.SizeIconSelectInput}
                    color={Global.ColorIconSelectInput} onClick={() => { handleOptions('button') }} />
            </LineButton>
            <ViewSelectOptions style={{ display: active ? 'flex' : 'none' }}>
                <ScrollView>
                    {OptionsFiltered.map((data, key) => {
                        return (
                            <ButtonOptions key={key} onPress={() => { handleSelected(data.value) }}>
                                <Text >{data.value}</Text>
                            </ButtonOptions>
                        )
                    })}
                </ScrollView>

            </ViewSelectOptions>
        </Container>

    )
}

export default InputSelect;