import React from "react";
import Button from "../button/button";
import {Container, Text} from './style'

function Header({title, name, name2, size, color, onClickLeft, onClickRight}) {
    return(
        <Container>
            <Button name={name} size={size} color={color} onClick={()=>{onClickLeft()}}/>
            <Text>
                {title}
            </Text>
            <Button name={name2} size={size} color={color} onClick={()=>{onClickRight()}}/>
        </Container>
    )
}

export default Header