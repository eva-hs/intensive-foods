import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { isActive, onPaginationClick } = this.props;

    return (
      <ul className="pagination">
        <li className={this.formatPageItem(isActive[0].active)}>
          <a
            onClick={() => onPaginationClick(isActive[0])}
            className="page-link"
            href="#"
          >
            1
          </a>
        </li>
        <li className={this.formatPageItem(isActive[1].active)}>
          <a
            onClick={() => onPaginationClick(isActive[1])}
            className="page-link"
            href="#"
          >
            2
          </a>
        </li>
        <li className={this.formatPageItem(isActive[2].active)}>
          <a
            onClick={() => onPaginationClick(isActive[2])}
            className="page-link"
            href="#"
          >
            3
          </a>
        </li>
      </ul>
    );
  }

  // Formats the pagination depending on isActives value.
  formatPageItem(isActive) {
    let formatPageItem = "page-item ";
    formatPageItem += isActive === true ? "active" : "disable";
    return formatPageItem;
  }
}

export default Pagination;
