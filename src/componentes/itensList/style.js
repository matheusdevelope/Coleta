import styled from "styled-components/native";
import Global from "../../global/global";

export const FlatList = styled.FlatList``;
export const LoadingIcon = styled.ActivityIndicator``;
export const Text = styled.Text`
  font-size: ${Global.fontSize};
  color: ${Global.textColor};
  font-weight: bold;
`;
export const Container = styled.View`
  margin: ${Global.margin};
  margin-top: 0;
  align-items: center;
`;
