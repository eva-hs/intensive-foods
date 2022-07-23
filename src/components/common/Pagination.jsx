import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { paginationValues, onPaginationClick } = this.props;
    return (
      <ul className="pagination">
        <li className={this.formatPageItem(paginationValues[0].isActive)}>
          <a
            onClick={() => onPaginationClick(paginationValues[0])}
            className="page-link"
            // href="#"
          >
            1
          </a>
        </li>
        <li className={this.formatPageItem(paginationValues[1].isActive)}>
          <a
            onClick={() => onPaginationClick(paginationValues[1])}
            className="page-link"
            // href="#"
          >
            2
          </a>
        </li>
        <li className={this.formatPageItem(paginationValues[2].isActive)}>
          <a
            onClick={() => onPaginationClick(paginationValues[2])}
            className="page-link"
            // href="#"
          >
            3
          </a>
        </li>
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
