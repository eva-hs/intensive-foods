import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { paginationValues, onPaginationClick } = this.props;

    return (
      <ul className="pagination">
        {paginationValues.map((value, index) => (
          <li key={value._id} className={this.formatPageItem(value.isActive)}>
            <a
              onClick={() => onPaginationClick(index)}
              className="page-link"
              // href="#"
            >
              {value._id + 1}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  // Formats the pagination depending on isActive value.
  formatPageItem(isActive) {
    let formatPageItem = "page-item ";
    formatPageItem += isActive ? "active" : "disable";
    return formatPageItem;
  }
}

export default Pagination;
