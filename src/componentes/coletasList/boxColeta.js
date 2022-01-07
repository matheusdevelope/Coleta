import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import Global from "../../global/global";
import GText from "../../global/texts";

import { Container, Line, Text, ButtonBox, LineBox } from "./style";

const BoxColeta = ({
  data,
  RouteName,
  showCheckBox,
  setShowCheckBox,
  handleOnChange,
  readyOnly,
}) => {
  const navigate = useNavigation();
  function handleSelectCheckBox(newValue) {
    handleOnChange(newValue, data[GText.infoInputs.nColetaNumber]);
  }

  function handleToggle() {
    if (!readyOnly) {
      !showCheckBox && handleSelectCheckBox(true);
      !showCheckBox && setShowCheckBox(!showCheckBox);
    }
  }

  function handleDetails() {
    if (!readyOnly) {
      showCheckBox
        ? handleSelectCheckBox(data.checked === true ? false : true)
        : navigate.navigate(GText.Details, {
            data: data,
            routeOrigin: RouteName,
          });
    }
  }

  return (
    <Container>
      {!readyOnly && showCheckBox && (
        <CheckBox
          value={data.checked === true ? true : false}
          onValueChange={(newValue) => handleSelectCheckBox(newValue)}
        />
      )}
      <LineBox>
        <ButtonBox
          onLongPress={handleToggle}
          onPress={handleDetails}
          style={{
            backgroundColor: readyOnly
              ? Global.white
              : data.checked === true
              ? Global.bluelight2
              : data[GText.ItensCanceledTotal] == -data[GText.ItensTotal]
              ? Global.redCanceled
              : Global.white,
          }}
        >
          <Line>
            <Text style={{ fontWeight: "bold" }}>
              {data[GText.infoInputs.nNameClient]}
            </Text>
          </Line>
          <Line>
            <Text>{data[GText.infoInputs.nColetaNumber]}</Text>
            <Text>
              {GText.infoInputs.pItem}: {data[GText.ItensTotal]}
            </Text>
            {!readyOnly &&
              RouteName == GText.SendedColetas &&
              data[GText.ItensCanceledTotal] > 0 && (
                <Text>
                  {GText.infoInputs.CancelStatusItem}:{" "}
                  {data[GText.ItensCanceledTotal]}
                </Text>
              )}
            <Text>
              {GText.money} {data[GText.ValueTotal]}
            </Text>
          </Line>
        </ButtonBox>
      </LineBox>
    </Container>
  );
};

export default BoxColeta;
