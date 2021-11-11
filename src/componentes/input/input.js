import React from "react";
import {Container, Input} from './style'

function InputApp({placeholder, text, changeText, ...rest}) {
    
    return(
        <Container>
            <Input placeholder={placeholder} value={text} onChangeText={(e)=>{changeText(e) }} {...rest}/>
        </Container>
    )
}

export default InputApp