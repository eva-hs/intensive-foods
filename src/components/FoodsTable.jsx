import React, { Component } from "react";
import Favorite from "./common/Favorite";
import Table from "./common/Table";

class FoodsTable extends Component {
  columns = [
    { label: "Name", path: "name" },
    { label: "Category", path: "category.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Price", path: "price" },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavorite={food.isFavorite}
          onStarClick={() => this.props.onStarClick(food)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(food)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { foods, sortColumn, onSort } = this.props;

    return (
      <Table
        data={foods}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FoodsTable;
