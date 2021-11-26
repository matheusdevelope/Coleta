import React, {useImperativeHandle, forwardRef, useState} from 'react';
import Global from '../../global/global';
import GText from '../../global/texts';
import Button from '../button/button';

import { Container, Line, Modal, Text, View } from './styles';

function ConfirmationModal({buttonRight }, ref) {
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
   // console.log('exec')
    return (
        <Modal visible={visible} onRequestClose={toggle} transparent={true} ref={ref}  >
            <Container activeOpacity={1} onPress={toggle} >
                <View activeOpacity={1}>
                    <Text style={{ fontSize: Global.fontSizeTitle_n, fontWeight: 'bold' }}>{GText.TitleDeleteItem}</Text>
                    <Text>{GText.MessageDelete}</Text>
                    <Line>
                        <Button label={GText.CancelDelete} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                            style={[style, { backgroundColor: Global.bluelight3 }]} 
                            onClick={toggle}/>
                        <Button label={GText.DeleteItem} styleLabel={{ color: Global.black, fontWeight: 'bold' }}
                            style={[style, { backgroundColor: Global.red }]} 
                            onClick={()=>{buttonRight(data)}}/>
                    </Line>
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