import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    let singleNote = this.props.singleNote;
    let addNoteState = this.props.addNoteState;
    const styles = StyleSheet.create({
      header:{
        flex:1,
        flexDirection: 'row',
        justifyContent:"space-between",
        marginTop: 50,
        // alignItems: 'stretch',
        // height:50
      }
    });
    return (
      <View>

          {singleNote ? (
             <View style={styles.header}>

              {!addNoteState ? (
                // <form >
                  <Button onPress={this.props.handlePress} title="All Notes" form="editNote"></Button>
                // </form>
              ) : (
                // <form>
                <Button title="All Notes" onPress={()=>this.props.writeNote()} form="addNote"></Button>
                // </form>
              )}


            </View>
          ) : (
            
            <View style={styles.header}>
              <Text>Folders</Text>
              <Text onPress={this.props.addNote}>Add</Text>
            </View>
            
            
          )}
          

      </View>
    );
  }
}
