import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { categories, categoryValues, onListGroupClick } = this.props;

    return (
      <ul className="list-group">
        <li
          onClick={() => onListGroupClick(categoryValues[0])}
          className={this.formatCategoryItem(categoryValues[0].isActive)}
        >
          All categories
        </li>
        <li
          onClick={() => onListGroupClick(categoryValues[1])}
          className={this.formatCategoryItem(categoryValues[1].isActive)}
        >
          {categories[0].name}
        </li>
        <li
          onClick={() => onListGroupClick(categoryValues[2])}
          className={this.formatCategoryItem(categoryValues[2].isActive)}
        >
          {categories[1].name}
        </li>
        <li
          onClick={() => onListGroupClick(categoryValues[3])}
          className={this.formatCategoryItem(categoryValues[3].isActive)}
        >
          {categories[2].name}
        </li>
      </ul>
    );
  }

  // Formats the pagination depending on isActive value.
  formatCategoryItem(isActive) {
    let formatCategoryItem = "list-group-item ";
    formatCategoryItem += isActive ? "active" : "";
    return formatCategoryItem;
  }
}

export default ListGroup;
