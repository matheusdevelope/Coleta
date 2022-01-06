import styled from "styled-components/native";
import Global from "../../global/global";

export const Container = styled.SafeAreaView`
  background-color: #fff;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const LoadingIcon = styled.ActivityIndicator``;
export const Modal = styled.Modal``;
export const ViewModal = styled.View`
  height: 100%;
  margin-bottom: 35%;
  justify-content: flex-end;
  flex: 1;
`;
export const TextHeader = styled.Text`
  font-size: ${Global.fontSizeTitle};
  color: ${Global.textColor};
  margin: 20px auto;
  font-weight: 900;
`;

export const Text = styled.Text`
  font-size: ${Global.fontSizeTitle};
  color: ${Global.textColor};
  margin: 20px auto;
  font-weight: 900;
`;

export const TextStyled = styled.Text`
  font-size: ${Global.fontSize};
  color: ${Global.textColor};
`;
export const ViewStyled = styled.View`
  margin: ${Global.margin} ${Global.margin} 2px ${Global.margin};
  background-color: ${Global.bluelight3Transparent};
  border-radius: ${Global.borderRadius};
  padding: ${Global.padding};
`;
export const ScrollView = styled.ScrollView`
  height: 100%;
  width: 100%;
  margin: 8px;
`;
