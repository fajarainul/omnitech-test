import React from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';

import NoteItem from '../components/item/note_item'
import EmptyNote from '../components/empty/empty_note'
  
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
            </View>
        );
    }
}

export default MainPage;