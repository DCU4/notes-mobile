import React, { Component } from "react";
import Form from "../presentational/Form.js";
import { View } from 'react-native';
export default class NewNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      class: "",
      apiResponse: "",
      addNote: this.props.addNote
    };
  }

  render() {
    return (
      <View className="single-note">
          <Form
            writeNote={this.props.writeNote}
            saveNote={this.props.saveNote}
            note={this.props.note}
            class={this.state.class}
            onChange={this.props.onChange}
          />
      </View>
    );
  }
}
