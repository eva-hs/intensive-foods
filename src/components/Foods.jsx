import React, { Component } from "react";
import { getFoods } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import FoodsTable from "./FoodsTable";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

// Bugs
// In allCategories. If all items in one page are deleted. It shows an emty page.

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

  handleDelete = (food) => {
    // Deletes the item you click on + bug fixer - In filtered category.
    // If all items were deleted, it showed an emty page.
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    // foods.filter(
    //   (food) => food.category._id === this.state.selectedCategori._id
    // ).length === 0
    //   ? console.log(
    //       this.setState({
    //         foods,
    //         selectedPage: 1,
    //         selectedCategori: DEFAULT_CATEGORY,
    //       })
    //     ) :
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
    this.setState({ selectedCategori: category, selectedPage: 1 });

  // filterFoods = (allFoods, selectedCategoriId) => {
  //   const filteredFoods = selectedCategoriId
  //     ? allFoods.filter((f) => f.category._id === selectedCategoriId)
  //     : allFoods;

  // Bug fixer - In filtered category.
  // If all items were deleted, it showed an emty page.
  // filteredFoods.length === 0 &&
  //   this.setState({ selectedPage: 1, selectedCategori: DEFAULT_CATEGORY });

  //   return filteredFoods;
  // };

  render() {
    const { length: count } = this.state.foods;
    const {
      pageSize,
      selectedPage,
      selectedCategori,
      categories,
      foods: allFoods,
    } = this.state;

    const filteredFoods = selectedCategori._id
      ? allFoods.filter((f) => f.category._id === selectedCategori._id)
      : allFoods;

    // Bug fixer - In filtered category.
    // If all items were deleted, it showed an emty page.
    // filteredFoods.length === 0 &&
    //   this.setState({ selectedPage: 1, selectedCategori: DEFAULT_CATEGORY });

    const foods = paginate(filteredFoods, selectedPage, pageSize);

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
              <span>Showing {filteredFoods.length} foods in the database</span>
              <FoodsTable
                foods={foods}
                onStarClick={this.handleStarClick}
                onDelete={this.handleDelete}
              />
              <Pagination
                itemCount={filteredFoods.length}
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
