import React, { Component } from "react";
import { Link } from "react-router-dom";
import Favorite from "./common/Favorite";
import Table from "./common/Table";

class FoodsTable extends Component {
  columns = [
    {
      label: "Name",
      path: "name",
      content: (food) => (
        <Link to={`/intensive-foods/foods/${food._id}`}>{food.name}</Link>
      ),
    },
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
      content: (food) =>
        this.props.user &&
        this.props.user.isAdmin && (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(food)}
          >
            Delete
          </button>
        ),
    },
  ];

  link = {
    foodFormLink: (food) => `/intensive-foods/foods/${food._id}`,
  };

  render() {
    const { foods, sortColumn, onSort } = this.props;

    return (
      <Table
        data={foods}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        link={this.link.foodFormLink}
      />
    );
  }
}

export default FoodsTable;
