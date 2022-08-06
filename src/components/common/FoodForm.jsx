import React, { Component } from "react";

class FoodForm extends Component {
  handleSave = () => {
    this.props.history.push("/intensive-foods/foods");
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
