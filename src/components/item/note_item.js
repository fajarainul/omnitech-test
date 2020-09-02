import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const NoteItem = (props)=>{
    return (
        <View
            style={styles.body}
        >
            <TouchableHighlight
                style={{flex:1}}
                onPress={()=>{
                    alert(props.title)
                }}
            >
                <View>
                    <Text
                        style={styles.title}
                    >
                        {props.title}
                    </Text>
                    <Text
                        style={styles.desc}
                    >{props.desc}
                    </Text>
                </View>
            </TouchableHighlight>

            <View
                style={{
                    flexDirection : 'row',
                }}
            >
                <Text onPress={()=>{console.log('edit')}} style={styles.editButton}>Edit</Text>
                <View style={{width:8}}></View>
                <Text onPress={props.onPressDelete} style={styles.deleteButton}>Delete</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body : {
        flexDirection : 'row',
        alignItems:'center',
        paddingLeft : 16,
        paddingRight:16,
        paddingTop:8,
        paddingBottom:8,
        justifyContent:'space-between'
    },
    title : {
        fontSize : 16,
    },
    desc : {
        fontSize : 12
    },
    editButton : {
        color : 'blue'
    },
    deleteButton :{
        color : 'red'
    }
    
  });

export default NoteItem;