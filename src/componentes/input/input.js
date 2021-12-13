import React from "react";
import {Container, InputArea} from './style'

function Input({placeholder, text, changeText, ...rest}) {
    
    return(
        <Container>
            <InputArea placeholder={placeholder} value={text} onChangeText={(e)=>{changeText(e) }} {...rest}/>
        </Container>
    )
}

export default Input