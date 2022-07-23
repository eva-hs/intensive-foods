import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    // Kolla upp i morgon: Jag har tagit bort all category från arrayn eftersom den annars mappar 4 gånger

    const { categories, categoryValues, onListGroupClick } = this.props;

    console.log(categories[0].name);
    return (
      <ul className="list-group">
        <li
          onClick={() => onListGroupClick(categoryValues[0])}
          className={this.formatCategoryItem(true)}
        >
          All categories
        </li>
        {categoryValues.map((value, index) => (
          <li
            key={index + 1}
            onClick={() => onListGroupClick(index + 1)}
            className={this.formatCategoryItem(value.isActive)}
          >
            Test
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

{
  /* <li
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
  } */
}
