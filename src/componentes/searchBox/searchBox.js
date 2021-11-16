import React from "react";
import Button from "../button/button";
import Input from "../input/input";
import {Container} from './style'

function SearchBox({placeholder, name, size, color, input, setInput}) {
    return(
        <Container>
            <Input placeholder={placeholder} text={input} changeText={setInput}/>
            <Button name={name} size={size} color={color}/>
        </Container>
    )
}

export default SearchBox