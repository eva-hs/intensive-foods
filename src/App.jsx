import React, { Component } from "react";
import { getFoods } from "./fakeFoodService";
import { getCategories } from "./fakeCategoryService";
import Favorite from "./components/common/Favorite";
import Pagination from "./components/common/Pagination";
import ListGroup from "./components/common/ListGroup";

class App extends Component {
  state = {
    foods: getFoods(),
    categories: getCategories(),
    pageSize: 4,
    selectedPage: 1,
    categoryValues: [
      { _id: 0, isActive: false },
      { _id: 1, isActive: false },
      { _id: 2, isActive: false },
    ],
    allCategoryValue: { _id: "a", isActive: true },
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

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleListGroupClick = (index) => {
    // Create new categoryValues array and allCategory object to reset isActive values

    const categoryValues = this.state.categoryValues.map((value) => ({
      ...value,
      isActive: false,
    }));
    // const allCategoryValue = { _id: "a", isActive: false };
    const allCategoryValue = {
      ...this.state.allCategoryValue,
      isActive: false,
    };
    // Make changes on index place we received in the function call
    index === "a"
      ? (allCategoryValue.isActive = true)
      : (categoryValues[index].isActive = true);
    // setState
    this.setState({ categoryValues, allCategoryValue });
  };

  render() {
    const { length: count } = this.state.foods;
    const { pageSize, selectedPage } = this.state;

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
                allCategoryValue={this.state.allCategoryValue}
                onListGroupClick={this.handleListGroupClick}
              />
            </div>
            <div className="col-10">
              <span>Showing {count} foods in the database</span>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
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
                itemCount={count}
                pageSize={pageSize}
                selectedPage={selectedPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
