import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  // Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import Nav from "../presentational/Nav.jsx";
// import Form from "../presentational/Form.jsx";
import Notes from "../presentational/Notes.js";
import NewNote from "../presentational/NewNote.js";
import SingleNote from "../presentational/SingleNote.js";
import Header from "../presentational/Header.js";

class Folder extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      note: "",
      apiResponse: "",
      singleNote: false,
      id: "",
      addNote: false
    };
    this.addClasses = this.addClasses.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  saveNote() {
    let url = "https://dc-notes.herokuapp.com/note";
    let data = "note=" + this.state.note;

    fetch(url, {
      method: "POST",
      body: data,
      mode: "no-cors", // no-cors, cors, *same-origin
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      // .then(res => res.json())
      .catch(function(error) {
        console.error("Error:", error);
      });
    // console.log(this.state.apiResponse);
  }

  writeNote = e => {
    // e.preventDefault();
    this.setState({
      note: "",
      addNote: false,
      singleNote:false
    });
    this.saveNote();
    this.getNotes();
  };


  onChange = event => {
    this.setState({ note: event });
  };

  getNotes() {
    let url = "https://dc-notes.herokuapp.com/";
    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (this._isMounted) {
      this.setState({ apiResponse: res });
    }}
  )};

  addNote = n => {
    let singleNote = this.state.singleNote;
    let addNote = this.state.addNote;
    let singleNoteState = singleNote ? false : true;
    let addNoteState = addNote ? false : true;

    this.setState({
      singleNote: singleNoteState,
      addNote: addNoteState
    });
  }



  handlePress (id) {
    let singleNote = this.state.singleNote;
    let state = singleNote ? false : true;
    console.log(id)
    this.setState({
      singleNote: state,
      addNote: false,
      id: id
    });
    
  };

  addClasses (){
    console.log('functuinal called')
    this.setState({ class: "all-notes-reveal" })
  }

  componentDidMount() {
    this.getNotes();
    this.addClasses();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let api = this.state.apiResponse;
    let singleNote = this.state.singleNote;
    let addNote = this.state.addNote;
    
    
    // console.log('addNote')
    if (!this.props || api.notes == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    // console.log(api.notes)

    return (
      <ScrollView style={{backgroundColor:'#b5c1be',paddingTop:50}}>
      <View style={{flex:1 }}>

      <View  style={{flex:1 ,backgroundColor:'#e8f5e9',justifyContent:"center",}}>
      <Header
            singleNote={singleNote}
            handlePress={this.handlePress}
            addNote={this.addNote}
            addNoteState={addNote}
            writeNote={this.writeNote}
                  
                />
      </View>
                




        {!singleNote ? (
          <View style={{backgroundColor:'#eeeeee', flex:7}} className={"all-notes "+this.state.class}>
            {api.notes.map((n, i) => {
              return (
                <View key={i}>
                {/* <Text style={{color:'#000'}}> */}
                  <Notes
                    note={n.note}
                    date={n.created}
                    key={i}
                    id={n._id}
                    handlePress={this.handlePress}
                    class={this.state.class}
                    deleteNote={this.deleteNote}
                    getNotes={this.getNotes}
                  />
                {/* </Text> */}
                </View>

              );
            }).reverse()}
          </View>
        ) : (
          !addNote ? (
            <View style={{backgroundColor:'#EEEEEE', flex:2}}>
              {/* <Text> */}
                <SingleNote
                  id={this.state.id}
                  note={this.state.note}
                  onChange={this.onChange}
                />
              {/* </Text> */}
            </View>
            
          ) : (
          <View style={{backgroundColor:'#EEEEEE', flex:2}}>
            {/* <Text> */}
              <NewNote
                writeNote={this.writeNote}
                saveNote={this.saveNote}
                note={this.state.note}
                addNote={addNote}
                onChange={this.onChange}
              />
            {/* </Text> */}
          </View>
          
          )
        )}

      </View>
      </ScrollView>
    );
  }
}




export default Folder;

// const wrapper = document.getElementById("app");
// wrapper ? ReactDOM.render(<Folder />, wrapper) : false;
