import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    // Kolla upp i morgon:
    // 1. Jag har tagit bort all category från arrayn eftersom den annars
    // mappar 4 gånger. Hur ska jag då göra med första formatering och onClick?
    // 2. Jag får inte rätt på categories[index].name

    const { categories, categoryValues, allCategoryValue, onListGroupClick } =
      this.props;

    console.log(categories[0].name);
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
