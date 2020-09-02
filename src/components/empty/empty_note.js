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
            <Text>Click button + for add a new Note</Text>
        </View>
    );
}

export default EmptyNote;