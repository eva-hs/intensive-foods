import React, { Component } from "react";
import Favorite from "./common/Favorite";

class FoodsTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { foods, onStarClick, onDelete, onSort } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("name")}>Name</th>
            <th onClick={() => this.raiseSort("category.name")}>Category</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("price")}>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>{food.category.name}</td>
              <td>{food.numberInStock}</td>
              <td>{food.price}</td>
              <td>
                <Favorite
                  isFavorite={food.isFavorite}
                  onStarClick={() => onStarClick(food)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(food)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default FoodsTable;
