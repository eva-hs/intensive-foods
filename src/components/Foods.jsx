import React, { Component } from "react";
import { getFoods } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";
import Favorite from "./common/Favorite";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategori: DEFAULT_CATEGORY,
  };

  componentDidMount() {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  }

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

  handleListGroupClick = (category) =>
    this.setState({ selectedCategori: category });

  render() {
    const { length: count } = this.state.foods;
    const {
      pageSize,
      selectedPage,
      selectedCategori,
      categories,
      foods: allFoods,
    } = this.state;

    const foods = paginate(allFoods, selectedPage, pageSize);

    return this.state.foods.length === 0 ? (
      <p>There are no foods in the database</p>
    ) : (
      <>
        <div className="container mt-4">
          <div className="row">
            <div className="col-2">
              <ListGroup
                items={categories}
                selectedItem={selectedCategori}
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
                  {foods.map((food) => (
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

export default Foods;
