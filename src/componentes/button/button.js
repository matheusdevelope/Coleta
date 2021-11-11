import React from "react";
import {Container} from './style'
 import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialIcons'

function Button({name, size, color, onClick, ...rest}) {
    return(
        <Container onPress={()=>{onClick()}} {...rest}>
            <Icon name={name} size={size} color={color} />
        </Container>
    )
}
export default Button