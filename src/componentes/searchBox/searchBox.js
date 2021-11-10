import React, { useState } from "react";
import Button from "../button/button";
import Input from "../input/input";
import {Container} from './style'

function SearchBox({placeholder, name, size, color, onClick}) {
    const [input, setInput] = useState('')
    return(
        <Container>
            <Input placeholder={placeholder} text={input} changeText={setInput}/>
            <Button name={name} size={size} color={color} onClick={()=>{onClick(input)}}/>
        </Container>
    )
}

export default SearchBox