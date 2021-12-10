import React from "react";
import Global from "../../global/global";
import Button from "../button/button";
import { Box1, Box2, Container, Text } from './style'

function Header({ title, name, name2, nameExtra, size, color, onClickLeft, onClickRightExtra, onClickRight, ...rest }) {
    return (
        <Container >
            <Box1>
                <Button {...rest} name={name} size={name === Global.iconBack ? 45 : size} color={color} onClick={() => { onClickLeft() }} />
            </Box1>
            <Text>
                {title}
            </Text>
            <Box2>
                <Button name={name2} size={size} color={color} onClick={() => { onClickRight() }} />
                {onClickRightExtra &&
                    <Button name={nameExtra} size={size} color={color} onClick={() => { onClickRightExtra() }} />
                }
            </Box2>
        </Container>
    )
}

export default Header