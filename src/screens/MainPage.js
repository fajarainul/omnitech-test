import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import NoteItem from '../components/item/note_item'
import EmptyNote from '../components/empty/empty_note'
import FloatingActionButton from '../components/button/floating_action_button'
  
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
                    onPress={() => this.props.navigation.navigate('Form')}
                />
            </View>
        );
    }
}

export default MainPage;