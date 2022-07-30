import React, { Component } from "react";
import _ from "lodash";
import { getFoods } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import FoodsTable from "./FoodsTable";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

// Bugs
// In a category. If all item in a category are deleted. It show an emty page.
// In allCategories. If all items in one page are deleted. It shows an emty page.

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategori: DEFAULT_CATEGORY,
    SortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  }

  handleDelete = (food) => {
    // Deletes the item you click on + bug fixer - In filtered category.
    // If all items in one category were deleted, it showed an emty page.
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    if (this.state.selectedCategori._id) {
      foods.filter(
        (food) => food.category._id === this.state.selectedCategori._id
      ).length === 0
        ? this.setState({
            foods,
            selectedPage: 1,
            selectedCategori: DEFAULT_CATEGORY,
          })
        : this.setState({ foods });
    } else this.setState({ foods });
  };

  handleSort = (path) => {
    const SortColumn = { ...this.state.SortColumn };
    if (SortColumn.path === path) {
      SortColumn.order = SortColumn.order === "asc" ? "desc" : "asc";
    } else {
      SortColumn.path = path;
      SortColumn.order = "asc";
    }

    this.setState({ SortColumn });
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

  render() {
    const { length: count } = this.state.foods;
    const {
      pageSize,
      selectedPage,
      selectedCategori,
      categories,
      foods: allFoods,
      SortColumn,
    } = this.state;

    // 1. Filter
    const filteredFoods = selectedCategori._id
      ? allFoods.filter((f) => f.category._id === selectedCategori._id)
      : allFoods;

    // 2. Sort
    const sortedFoods = _.orderBy(
      filteredFoods,
      [SortColumn.path],
      [SortColumn.order]
    );

    // 3. Pagination
    const foods = paginate(sortedFoods, selectedPage, pageSize);

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
                onSort={this.handleSort}
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
