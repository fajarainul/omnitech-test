import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import NoteItem from '../components/item/note_item'
import EmptyNote from '../components/empty/empty_note'
import FloatingActionButton from '../components/button/floating_action_button'
import {getNotes, deleteNote} from '../database/NoteDB'
  
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

    confirmDelete = (id) =>
        Alert.alert(
        "Delete Note",
        "Are you sure you want to delete?",
        [
            { text: "Yes", onPress: () => deleteNote(id) },
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            
        ],
        { cancelable: true }
        );

    render(){
        const renderItem = ({ item }) => (
            <NoteItem title={item.title} desc={item.desc} onPressDelete={()=>this.confirmDelete(item.id)}/>
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