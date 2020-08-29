import React from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';


const DATA = [
    
  ];

  
class MainPage extends React.Component{
    
    render(){
        const renderItem = ({ item }) => (
            <NoteItem title={item.title} desc={item.desc} />
          );

        return(
            <View>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={()=><EmptyList/>}
                />
            </View>
        );
    }
}

export default MainPage;

const NoteItem = (props)=>{
    return (
        <View
            style={{
                flexDirection : 'row',
                alignItems:'center',
                paddingLeft : 16,
                paddingRight:16,
                paddingTop:8,
                paddingBottom:8
            }}
        >
            <View>
                <Text
                    style={{
                        fontSize:16
                    }}
                >
                    {props.title}
                </Text>
                <Text
                    style={{
                        fontSize : 12
                    }}
                >{props.desc}
                </Text>
            </View>

            <Text>Edit</Text>
            <Text>Delete</Text>
        </View>
    )
}

const EmptyList = ()=>{
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