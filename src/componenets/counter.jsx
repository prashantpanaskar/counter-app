import React, { Component } from "react";
import * as firebase from "firebase";
class Counter extends Component {
  constructor() {
    super();
    this.state = { FirstName: "x" };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child("Mobile");
    console.log({ speedRef });

    speedRef.on("value", snap => {
      console.log("Value", snap.key);
      this.setState({ FirstName: snap.val() });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.FirstName}</h1>
        <span className={this.GetBadgeClasses()}>{this.formatCount()}</span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  GetBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
