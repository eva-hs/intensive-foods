import React, { Component } from "react";
import { getFoods } from "./fakeFoodService";
import Favorite from "./components/common/Favorite";
import Pagination from "./components/common/Pagination";

class App extends Component {
  state = {
    foods: getFoods(),
    isActive: [
      { _id: 0, active: false },
      { _id: 1, active: false },
      { _id: 2, active: false },
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

  handlePaginationClick = (a) => {
    // create new isActive array
    const isActive = [
      { _id: 0, active: false },
      { _id: 1, active: false },
      { _id: 2, active: false },
    ];
    // Find index place in old array
    const index = this.state.isActive.indexOf(a);
    // clone the object on the index place
    isActive[index] = { ...a };
    // Make changes
    isActive[index].active = true;
    //setState
    this.setState({ isActive });
  };

  render() {
    return this.state.foods.length === 0 ? (
      <p>There are no foods in the database</p>
    ) : (
      <>
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
          isActive={this.state.isActive}
          onPaginationClick={this.handlePaginationClick}
        />
      </>
    );
  }
}

export default App;
