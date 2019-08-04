import React, { Component } from 'react';
import { TextInput } from 'react-native';


export default class Form extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let note = this.props.note

    return (
      
      // <form id="addNote" className={this.props.class} onSubmit={note!=="" ? this.props.writeNote : null}>
        <TextInput 
          id="addNote"  
          onSubmitEditing={note!=="" ? this.props.writeNote : null} 
          value={note} 
          onChangeText={(event)=>this.props.onChange(event)}
          placeholder='new note'
        />
    );
  }
}