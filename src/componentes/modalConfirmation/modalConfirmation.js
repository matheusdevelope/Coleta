import React, {useImperativeHandle, forwardRef, useState} from 'react';
import Global from '../../global/global';
import Button from '../button/button';

import { Container, Line, Modal, Text, View } from './styles';

function ConfirmationModal({button, label }, ref) {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState('')
    useImperativeHandle(ref, () => ({
        toggle: () => {
            toggle();
        },
        sendvalue:(data)=>{
            setData(data)
        }
    }));
    function toggle() {
        setVisible(!visible)
    }
    return (
        <Modal visible={visible} onRequestClose={toggle} transparent={true} ref={ref}  >
            <Container activeOpacity={1} onPress={toggle} >
                <View activeOpacity={1}>
                    <Text style={{ fontSize: Global.fontSizeTitle_n, fontWeight: 'bold' }}>{label.title}</Text>
                    <Text>{label.message}</Text>
                    {
                        label.invertButtons ?
                            <Line>
                                <Button label={label.buttonRight} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.red }]}
                                    onClick={() => { button(data) }} />
                                <Button label={label.buttonLeft} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.bluelight3 }]}
                                    onClick={toggle} />
                            </Line>
                            :
                            <Line>
                                <Button label={label.buttonLeft} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.bluelight3 }]}
                                    onClick={toggle} />
                                <Button label={label.buttonRight} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.red }]}
                                    onClick={() => { button(data) }} />
                            </Line>
                    }
                </View>
            </Container>
        </Modal>
    )
}
export default forwardRef(ConfirmationModal);
export const style = {
    flex: 1,
    borderRadius: Global.borderRadius_n,
    margin: Global.marginInputs_n,
    padding: (Global.padding_n / 2)
}