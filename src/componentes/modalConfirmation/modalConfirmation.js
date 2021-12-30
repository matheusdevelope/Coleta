import React, {useImperativeHandle, forwardRef, useState, useRef, useEffect} from 'react';
import Global from '../../global/global';
import Button from '../button/button';

import { Container, Line, Modal, Text, View } from './styles';

function ConfirmationModal({button, label }, ref) {
    const labelRef = useRef(false)
    let dataLabel = !labelRef.current ? label : labelRef.current
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState('')
    useImperativeHandle(ref, () => ({
        
        toggle: () => {
            toggle();
        },
        sendvalue:(data)=>{
            setData(data)
        },
        setLabel:(data)=>{
            labelRef.current = data
        }
        ,
        close:()=>{
            labelRef.current = false
            setVisible(false)
        }
    }));
    function toggle() {
        setVisible(!visible)
    }
 
    return (
        <Modal visible={visible} onRequestClose={toggle} transparent={true} ref={ref}  >
            <Container activeOpacity={1} onPress={toggle} >
                <View activeOpacity={1}>
                    <Text style={{ fontSize: Global.fontSizeTitle_n, fontWeight: 'bold' }}>{dataLabel.title}</Text>
                    <Text>{dataLabel.message}</Text>
                    {
                        dataLabel.invertButtons ?
                            <Line>
                                <Button label={dataLabel.buttonRight} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.red }]}
                                    onClick={() => { button(data) }} />
                                <Button label={dataLabel.buttonLeft} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.bluelight3 }]}
                                    onClick={toggle} />
                            </Line>
                            :
                            <Line>
                                <Button label={dataLabel.buttonLeft} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                                    style={[style, { backgroundColor: Global.bluelight3 }]}
                                    onClick={toggle} />
                                <Button label={dataLabel.buttonRight} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
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