import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native';

export default class SingleNote extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      class: "",
      apiResponse: ""
    };
  }

  getSingleNote() {
    let id = this.props.id;
    console.log(id)
    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }

    let url = "https://dc-notes.herokuapp.com/" + id;
    fetch(url)
		.then(res => res.json())
		.then(
			res => {
				if (this._isMounted) {
					this.setState({ apiResponse: res });
				}
			}
		);
  }

  editNote = e => {
    // e.preventDefault();
    let id = this.props.id;
    
    if (!this.props || id == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    let url = "https://dc-notes.herokuapp.com/" + id + "/?_method=PUT";
    let data = "note="+this.props.note;
    fetch(url, {
      method: "POST",
      body: data,
      mode: "no-cors", // no-cors, cors, *same-origin
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .catch(function(error) {
        console.error("Error:", error);
      });
      console.log('edited note');
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('single note mounted');
    this.getSingleNote();
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.getSingleNote();
  }

  render() {
    let note = this.state.apiResponse;
    let oldNote = this.props.note;
    console.log(oldNote)
    const styles = StyleSheet.create({
      textInput:{
        
      },
      singleNoteShowing: {
        flex:1,
        alignItems: 'stretch',
        // justifyContent:"space-between",
        // alignSelf: 'stretch',
        // height: 50,
        // width:100
      },
    });
    if (!this.props || note.notes == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    console.log(note.notes.note)
    // console.log(note.notes);
    let day = new Date(note.notes.created).getDate();
    let month = new Date(note.notes.created).getMonth();
    let year = new Date(note.notes.created).getFullYear();
    return (
      <View style={styles.singleNoteShowing} className="single-note">
        <Text style={{flex:1}} className="date">{month}-{day}-{year}</Text>
        {/* <form id="editNote" onSubmit={oldNote !== "" ? this.editNote : null}> */}
          <TextInput 
            style={{flex:4,height:100}} 
            value={note.notes.note} 
            onChangeText={this.props.onChange}
            multiline = {true}
            />
        {/* </form> */}
      </View>
    );
  }
}
