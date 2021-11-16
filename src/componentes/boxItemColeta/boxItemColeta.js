import React, { useState } from 'react';
import { Profile } from '../../../DadosOffline/Coletas Lista';
import Global from '../../global/global';
import GText from '../../global/texts';
import Button from '../button/button';

import { Container, Line, Text, ButtonBox } from './style';



const BoxItemColeta = ({ data }) => {
    const [toggle, setToggle] = useState(false)
    function getName(data, field) {
        const ret = Profile.company.branch.find(ob => ob.id = data)
        return ret[field]
    }
    function handleDelete(data) {
        console.log(data)
    }

    return (
        <Container>
            <Line>
                <ButtonBox onLongPress={() => { setToggle(!toggle) }}>
                    <Text style={{ margin: 'auto', fontSize: Global.fontSize_n }}>
                        Item: {data[GText.infoInputs.nItem]}
                    </Text>
                    <Line>
                        <Text style={{ fontWeight: 'bold' }}>
                            {data[GText.infoInputs.nServicesExec]} - {data[GText.infoInputs.nDimension]}
                        </Text>
                        <Text>{data[GText.infoInputs.nBrand]}</Text>
                    </Line>
                    <Line>
                        <Text>{getName(GText.infoInputs.nCodBranch, 'type')}</Text>
                        <Text>{data[GText.infoInputs.nBoard]}</Text>
                        <Text>{GText.infoInputs.money} {data[GText.infoInputs.nValue]}</Text>
                    </Line>
                    {
                        data[GText.infoInputs.nObservation] !== null &&
                        <Line>
                            <Text style={{ color: Global.colorObservation }}>{data[GText.infoInputs.nObservation]}</Text>
                        </Line>
                    }

                </ButtonBox>
                <Button name={'trash'} size={40} color={Global.colorButtonDelete}
                    onClick={() => { handleDelete(data) }}
                    style={{
                        margin: 8,
                        display: toggle ? 'flex' : 'none'
                    }} />
            </Line>
        </Container>
    )
}

export default BoxItemColeta;