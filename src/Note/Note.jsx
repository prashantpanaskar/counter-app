import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteContentId = props.noteContentId;
  }

  render(props) {
    return (
      <div className="Note fade-in">
        <p className="NoteContent">{this.noteContent}</p>
      </div>
    );
  }
}

Note.PropTypes = {
  noteContent: PropTypes.string
};
export default Note;
