import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { categories, categoryValues, allCategoryValue, onListGroupClick } =
      this.props;

    return (
      <ul className="list-group">
        <li
          key={allCategoryValue._id}
          onClick={() => onListGroupClick(allCategoryValue._id)}
          className={this.formatCategoryItem(allCategoryValue.isActive)}
        >
          All categories
        </li>
        {categoryValues.map((value, index) => (
          <li
            key={value._id}
            onClick={() => onListGroupClick(index)}
            className={this.formatCategoryItem(value.isActive)}
          >
            {categories[index].name}
          </li>
        ))}
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
