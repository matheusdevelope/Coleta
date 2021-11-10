import React from "react";
import {Container} from './style'
import Icon from 'react-native-vector-icons/FontAwesome';

function Button({name, size, color, onClick}) {
    return(
        <Container onPress={()=>{onClick()}}>
            <Icon name={name} size={size} color={color}/>
        </Container>
    )
}
export default Button