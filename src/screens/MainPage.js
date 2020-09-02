import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import NoteItem from '../components/item/note_item'
import EmptyNote from '../components/empty/empty_note'
import FloatingActionButton from '../components/button/floating_action_button'
import {getNote, getNotes} from '../database/NoteDB'
  
class MainPage extends React.Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            notes : [],
        }

    }

    async componentDidMount(){
        let result = await getNotes();
        this.setState({
            notes : [...result]
        })
    }

    render(){
        const renderItem = ({ item }) => (
            <NoteItem title={item.title} desc={item.desc}/>
          );

        return(
            <View
                style={{
                    flex : 1
                }}
            >
                <FlatList
                    data={this.state.notes}
                    renderItem={renderItem}
                    keyExtractor={item => ""+item.id}
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