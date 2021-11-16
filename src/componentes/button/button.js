import React from "react";
import { Container, Text } from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialIcons'

function Button({ name, label, styleLabel, size, color, onClick, ...rest }) {
    return (
        <Container onPress={() => { onClick() }} {...rest}>
            {label !== undefined && name == undefined ?
                <Text style={styleLabel}>{label}</Text>
                :
                <Icon name={name} size={size} color={color} />
            }

        </Container>
    )
}
export default Button