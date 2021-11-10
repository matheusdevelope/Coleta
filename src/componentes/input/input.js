import React from "react";
import {Container, Input} from './style'

function InputApp({placeholder, text, changeText, id}) {
    
    return(
        <Container>
            <Input placeholder={placeholder} value={text} onChangeText={(e)=>{changeText(e) }}/>
        </Container>
    )
}

export default InputApp