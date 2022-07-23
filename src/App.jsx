import React, { Component } from "react";
import { getFoods } from "./fakeFoodService";
import Favorite from "./components/common/Favorite";
import Pagination from "./components/common/Pagination";
import ListGroup from "./components/common/ListGroup";

class App extends Component {
  state = {
    foods: getFoods(),
    paginationValues: [
      { _id: 0, isActive: false },
      { _id: 1, isActive: false },
      { _id: 2, isActive: false },
    ],
  };

  handleDelete = (_id) => {
    const foods = this.state.foods.filter((food) => food._id !== _id);
    this.setState({ foods });
  };

  handleStarClick = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  handlePaginationClick = (value) => {
    // Create new paginationValues array to reset isActive values
    const paginationValues = [
      { _id: 0, isActive: false },
      { _id: 1, isActive: false },
      { _id: 2, isActive: false },
    ];
    // Find index place in old array
    const index = this.state.paginationValues.indexOf(value);
    // Make changes
    paginationValues[index].isActive = true;
    // setState
    this.setState({ paginationValues });
  };

  render() {
    return this.state.foods.length === 0 ? (
      <p>There are no foods in the database</p>
    ) : (
      <>
        <ListGroup />
        <p>Showing {this.state.foods.length} foods in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.numberInStock}</td>
                <td>{food.price}</td>
                <td>
                  <Favorite
                    isFavorite={food.isFavorite}
                    onStarClick={() => this.handleStarClick(food)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          paginationValues={this.state.paginationValues}
          onPaginationClick={this.handlePaginationClick}
        />
      </>
    );
  }
}

export default App;
