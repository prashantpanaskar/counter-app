import React, { Component } from "react";
import NavBar from "./componenets/navbar";
import "./App.css";
import Counters from "./componenets/counters";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./Config/Config";
import * as firebase from "firebase/app";
import "firebase/database";
import { createStore } from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app
      .database()
      .ref()
      .child("notes");

    this.state = {
      notes: []
    };

    const counter = (state = 0, action) => {
      switch (action.type) {
        case "INCREMENT":
          return state + 1;
        case "DECREMENT":
          return state - 1;
        default:
          return state;
      }
    };

    const store = createStore(counter);
  }

  componentDidUpdate() {
    const previousNotes = this.state.notes;

    this.db.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({ notes: previousNotes });
    });
  }

  addNote(note) {
    this.db.push().set({ noteContent: note });
  }

  render() {
    let notes = this.state.notes;
    store.subscribe(() => Console.log(store.getState()));
    return (
      <Provider store="{store}">
        <div className="notesWrapper">
          <div className="notesHeader">
            <h1>React & Firebase To-DO List</h1>
          </div>
          <div className="notesBody">
            {notes.map((data, i) => (
              <Note noteContent={data.noteContent} />
            ))}
          </div>
          <div className="notesFooter">
            <NoteForm addNote={this.addNote} />
          </div>
        </div>
      </Provider>
    );
  }
  /* state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState(counters);
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onReset={this.handleReset}
          />
        </main>
      </React.Fragment>
    );
  } */
}

export default App;
