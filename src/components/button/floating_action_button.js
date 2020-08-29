import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const FloatingActionButton = (props) => (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View
        style={{
          backgroundColor: 'purple',
          width: 45,
          height: 45,
          borderRadius: 45,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
           <Icon name="plus" size={16} color="white" />
        </View>
    </TouchableOpacity>
  );

  export default FloatingActionButton;