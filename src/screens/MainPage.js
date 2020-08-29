import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import NoteItem from '../components/item/note_item'
import EmptyNote from '../components/empty/empty_note'
import Icon from 'react-native-vector-icons/FontAwesome';
  
class MainPage extends React.Component{
    
    data= ()=>{
        var result = [];
        for(var i=0;i<100;i++){
            result[i] = {
                id : ''+i,
                title : 'Title Note ' + i,
                desc : 'Desc Note ' + i,
            }
        }
    
        console.log(result)
    
        return result;
    }

    render(){
        const renderItem = ({ item }) => (
            <NoteItem title={item.title} desc={item.desc} />
          );

        return(
            <View>
                <FlatList
                    data={this.data()}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={()=><EmptyNote/>}
                />
                <FloatingActionButton 
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                    }}
                    onPress={() => alert(`I'm being clicked!`)}
                />
            </View>
        );
    }
}

export default MainPage;

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