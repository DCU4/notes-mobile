import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      class: ""
    }
  }

  deleteNote = del => {

    let id = this.props.id;
    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    let url = "https://dc-notes.herokuapp.com/" + id + "/?_method=DELETE";
    fetch(url, {
      method: "POST",
      mode: "no-cors", // no-cors, cors, *same-origin
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    // .then(res => console.log(res.json()))
    .catch(function(error) {
      console.error("Error:", error);
    }).then(this.setState({
      delete: !this.state.delete ? true : false
    }));
    
  }

  onSubmit = (e) => {
    this.deleteNote();
    this.props.getNotes();
  }

  onTouchMove = e => {
    //if the right is over 50% showing than add this
    this.setState({ class: "delete-reveal" })
  }


  render() {
    let note = this.props.note;
    let deleted = this.state.delete;
    let className = this.props.class;
    // console.log(className);
    let id = this.props.id;
    let date = this.props.date;
    let d = new Date(date).toDateString();
    let truncate = (input) => input.length > 15 ? `${input.substring(0, 10)}...` : input;
    // let delay = (input) =>
    const styles = StyleSheet.create({
      singleNote: {
        flex:1,
        flexDirection: 'row',
        // justifyContent:"space-between",
        
      },
      notesList:{
        padding: 10,
        flexDirection: 'row',
        justifyContent:"space-between",
        marginLeft: 10,
        marginRight:10,
        alignItems: 'center',
        borderBottomColor:'#E1E2E1',
        borderBottomWidth:1
        
      },
      noteText:{
        color: '#041702',
        flex:1
      },
      deleted: {
        transform: [{translateY:-100}]
      }
    });

    if (!this.props || this.props.note == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    return (
      !deleted &&
          <View style={styles.notesList} onTouchMove={this.onTouchMove}>

            <TouchableOpacity onPress={() => this.props.handlePress(id)}  style={styles.singleNote} id={id}>
              <Text style={styles.noteText} className="date">{d}</Text>
              <Text style={styles.noteText} >{truncate(note)}</Text>
            </TouchableOpacity>

            

            <Button color='#041702' title="X" onPress={()=>this.onSubmit()}>
              {/* <Text>X</Text> */}
            </Button>
          </View>


    );
  }
}
