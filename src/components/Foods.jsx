import React, { Component } from "react";
import _ from "lodash";
import { getFoods, deleteFood } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import FoodsTable from "./FoodsTable";
import SearchBoxForm from "./common/SearchBoxForm";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    searchedFoods: [],
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

  // Deletes the item when you click on its Delete button.
  //+ bug fixer - In filtered category and allCategories
  // If all items in one category were deleted, it showed an emty page.
  handleDelete = (food) => {
    deleteFood(food._id);
    const foods = getFoods();
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

  // Jag har fått själva sökfunktionen till att fungera.
  // Men jag lyckas inte koppla den till foodsarrayen på sidan
  handleSearchBox(searchdata) {
    const allFoods = getFoods();
    if (searchdata) {
      const foods = [];
      for (const food of allFoods) {
        const foodName = food.name.toLowerCase();
        const searchData = searchdata.toLowerCase();
        if (foodName.startsWith(searchData) === true) {
          foods.push(food);
        }
      }
      console.log(foods);
      return { foods, FilteredCount: foods.length };
    } else {
      // const foods = allFoods;
      // return { foods, FilteredCount: foods.length };
      this.getPaginatedFoods();
    }
  }

  render() {
    const { pageSize, selectedPage, selectedCategori, categories, sortColumn } =
      this.state;

    const { length: count } = this.state.foods;

    const { foods, FilteredCount } = this.getPaginatedFoods();

    // Tanken är att skapa foods från handleSearchBox om den är truthy,
    // annars getPaginatedFood - men handleSearchBox blir hela tiden falsy
    // const { foods, FilteredCount } =
    //   this.handleSearchBox() || this.getPaginatedFoods();
    // console.log(foods);

    return (
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
            <button className="btn-primary">
              <Link className="btn btn-primary" to="/intensive-foods/foods/new">
                New Food
              </Link>
            </button>
            {count === 0 ? (
              <p>There are no foods in the database</p>
            ) : (
              <>
                <p>Showing {FilteredCount} foods in the database</p>

                <SearchBoxForm onSearch={this.handleSearchBox} />
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
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Foods;
