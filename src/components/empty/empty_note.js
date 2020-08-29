import React from 'react';
import {
  View,
  Text
} from 'react-native';

const EmptyNote = ()=>{
    return (
        <View
            style={{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <Text>Empty List</Text>
        </View>
    );
}

export default EmptyNote;