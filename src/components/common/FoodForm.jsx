import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class FoodForm extends Component {
  handleSave = () => {
    this.props.history.push("/foods");
  };

  render() {
    return (
      <>
        <h1>Food Form {this.props.match.params.id}</h1>
        <button className="btn btn-primary" onClick={() => this.handleSave()}>
          Save
        </button>
      </>
    );
  }
}

export default FoodForm;
