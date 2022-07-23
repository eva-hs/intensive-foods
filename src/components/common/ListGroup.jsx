import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { categories } = this.props;
    console.log(categories);
    return (
      <ul className="list-group">
        <li className="list-group-item">All categories</li>
        <li className="list-group-item">{categories[0].name}</li>
        <li className="list-group-item">{categories[1].name}</li>
        <li className="list-group-item">{categories[2].name}</li>
      </ul>
    );
  }
}

export default ListGroup;
