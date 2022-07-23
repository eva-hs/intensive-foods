import React, { Component } from "react";
import { getFoods } from "./fakeFoodService";
import { getCategories } from "./fakeCategoryService";
import Favorite from "./components/common/Favorite";
import Pagination from "./components/common/Pagination";
import ListGroup from "./components/common/ListGroup";

class App extends Component {
  state = {
    foods: getFoods(),
    paginationValues: [
      { _id: 0, isActive: true },
      { _id: 1, isActive: false },
      { _id: 2, isActive: false },
    ],
    categories: getCategories(),
    categoryValues: [
      { _id: 0, isActive: true },
      { _id: 1, isActive: false },
      { _id: 2, isActive: false },
      { _id: 3, isActive: false },
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

  handleListGroupClick = (value) => {
    // Create new categoryValues array to reset isActive values
    const categoryValues = [
      { _id: 0, isActive: false },
      { _id: 1, isActive: false },
      { _id: 2, isActive: false },
      { _id: 3, isActive: false },
    ];
    // Find index place in old array
    const index = this.state.categoryValues.indexOf(value);
    // Make changes
    categoryValues[index].isActive = true;
    // setState
    this.setState({ categoryValues });
  };

  render() {
    return this.state.foods.length === 0 ? (
      <p>There are no foods in the database</p>
    ) : (
      <>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <ListGroup
                categories={this.state.categories}
                categoryValues={this.state.categoryValues}
                onListGroupClick={this.handleListGroupClick}
              />
            </div>
            <div className="col-10">
              <span>
                Showing {this.state.foods.length} foods in the database
              </span>
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
