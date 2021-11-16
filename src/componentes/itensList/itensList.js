import React from 'react';
import { View , TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { FlatList, Text } from './style';


// interface Props extends TouchableWithoutFeedbackProps {
//   style?: ViewStyle;
//   children?: React.ReactNode;
// }

// export default function CardView({style, children, onPress}) {
//   const card = (
//     <View
//       style={{
//         shadowColor: 'gery',
//         backgroundColor: 'white',
//         padding: 18,
//         overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

//         // iOS
//         shadowOffset: {width: 0, height: 2},
//         shadowRadius: 18,
//         shadowOpacity: 0.2,
//         borderRadius: 12,

//         // Android
//         elevation: 8,

//         ...style,
//       }}>
//       {children}
//     </View>
//   );

//   if (Platform.OS === 'android') {
//     return (
//       <TouchableNativeFeedback
//         onPress={e => onPress?.call(undefined, e)}
//         background={TouchableNativeFeedback.Ripple('#00000040', false)}
//         useForeground={true}>
//         {card}
//       </TouchableNativeFeedback>
//     );
//   } else {
//     return (
//       <TouchableOpacity
//         onPress={e => onPress?.call(undefined, e)}
//         activeOpacity={0.5}>
//         {card}
//       </TouchableOpacity>
//     );
//   }
// }


 const ItensList = ({ itens }) => {
   return (
       <FlatList
       data={itens}
       renderItem={({item})=>(<TouchableOpacity onPress={()=>{console.log('press')}}>
          <Text>{item.label}</Text>
       </TouchableOpacity>)}
       keyExtractor={item=>item.value}
       />
     
   )
 }

 export default ItensList;