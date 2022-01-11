import React, { useState } from "react";
import Global from "../../global/global";
import GText from "../../global/texts";
import Button from "../button/button";

import { Container, Line, Text, ButtonBox } from "./style";

const BoxItemColeta = ({
  data,
  DeleteItem,
  EditItem,
  RouteName,
  HideCanceled,
  details,
}) => {
  const [toggle, setToggle] = useState(false);
  function handleDelete() {
    DeleteItem(data);
    setToggle(false);
  }
  function handleEditItem() {
    EditItem(data);
  }
  function Icon() {
    if (RouteName == GText.MyColetas) {
      return Global.IconTrash;
    } else if (RouteName == GText.SendedColetas) {
      return Global.IconCancel;
    } else {
      return Global.IconDefault;
    }
  }
  function OnLongPress() {
    if (RouteName === GText.SendedColetas) {
      data[GText.infoInputs.nStatus] !== GText.infoInputs.CancelStatusItem &&
        setToggle(!toggle);
    } else {
      data[GText.infoInputs.nId] === "" && setToggle(!toggle);
    }
  }
  return (
    <Container
      style={{
        display:
          HideCanceled &
          (details === undefined) &
          (data[GText.infoInputs.nStatus] == GText.infoInputs.CancelStatusItem)
            ? "none"
            : "flex",
      }}
    >
      <Line>
        <ButtonBox
          onPress={handleEditItem}
          onLongPress={OnLongPress}
          style={{
            backgroundColor:
              data[GText.infoInputs.nStatus] ==
              GText.infoInputs.CancelStatusItem
                ? Global.redCanceled
                : Global.white,
          }}
        >
          <Text style={{ margin: "auto", fontSize: Global.fontSize_n }}>
            Item: {data[GText.infoInputs.nItem]}
          </Text>
          <Line>
            <Text style={{ fontWeight: "bold" }}>
              {data[GText.infoInputs.nServicesExec]} -{" "}
              {data[GText.infoInputs.nDimension]}
            </Text>
            <Text>{data[GText.infoInputs.nBrand]}</Text>
          </Line>
          <Line>
            <Text>{data[GText.infoInputs.nBranch]}</Text>
            <Text>{data[GText.infoInputs.nBoard]}</Text>
            <Text>
              {GText.money} {data[GText.infoInputs.nValue]}
            </Text>
          </Line>
          {data[GText.infoInputs.nObservation] !== null && (
            <Line>
              <Text style={{ color: Global.colorObservation }}>
                {data[GText.infoInputs.nObservation]}
              </Text>
            </Line>
          )}
        </ButtonBox>
        <Button
          name={Icon()}
          size={40}
          color={Global.colorButtonDelete}
          onClick={handleDelete}
          style={{
            margin: 8,
            display: toggle ? "flex" : "none",
          }}
        />
      </Line>
    </Container>
  );
};

export default BoxItemColeta;
