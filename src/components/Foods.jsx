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
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  }

  handleDelete = (food) => {
    // Deletes the item you click on
    //+ bug fixer - In filtered category and allCategories
    // If all items in one category were deleted, it showed an emty page.
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    // Fixes bug when you have chosen a category and deletes all the items.
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
    } // fixes bug in allcategories when you delete the last item in a page.
    else if (
      foods.length <=
      (this.state.selectedPage - 1) * this.state.pageSize
    ) {
      this.setState({ foods, selectedPage: this.state.selectedPage - 1 });
    } else {
      this.setState({ foods });
    }
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });

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

  getPaginatedFoods() {
    const {
      pageSize,
      selectedPage,
      selectedCategori,
      foods: allFoods,
      sortColumn,
    } = this.state;
    // 1. Filter
    const filteredFoods = selectedCategori._id
      ? allFoods.filter((f) => f.category._id === selectedCategori._id)
      : allFoods;

    // 2. Sort
    const sortedFoods = _.orderBy(
      filteredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );

    // 3. Pagination
    const foods = paginate(sortedFoods, selectedPage, pageSize);

    return { foods, FilteredCount: filteredFoods.length };
  }

  render() {
    const { pageSize, selectedPage, selectedCategori, categories, sortColumn } =
      this.state;

    const { length: count } = this.state.foods;

    const { foods, FilteredCount } = this.getPaginatedFoods();

    return count === 0 ? (
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
              <span>Showing {FilteredCount} foods in the database</span>
              <FoodsTable
                foods={foods}
                onStarClick={this.handleStarClick}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemCount={FilteredCount}
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
