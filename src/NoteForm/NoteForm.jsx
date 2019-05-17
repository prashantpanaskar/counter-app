import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ""
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.WriteNote = this.WriteNote.bind(this);
  }

  handleUserInput(e) {
    console.log(e);
    this.setState({
      newNoteContent: e.target.value
    });
  }

  WriteNote() {
    this.props.addNote(this.state.newNoteContent);
    this.setState({
      newNoteContent: ""
    });
  }

  render() {
    return (
      <div>
        <input
          className="noteInput"
          placeholder="Write a note here..."
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
        />
        <button className="noteButton" onClick={this.WriteNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
