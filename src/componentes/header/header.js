import React from "react";
import Global from "../../global/global";
import Button from "../button/button";
import {Container, Text} from './style'

function Header({title, name, name2, size, color, onClickLeft, onClickRight, ...rest}) {
    return(
        <Container >
            <Button {...rest} name={name} size={name === Global.iconBack ? 45 :size} color={color} onClick={()=>{onClickLeft()}}/>
            <Text>
                {title}
            </Text>
            <Button name={name2} size={size} color={color} onClick={()=>{onClickRight()}}/>
        </Container>
    )
}

export default Header