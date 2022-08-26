import React, { Component } from "react";
import _ from "lodash";
import { getFoods, deleteFood } from "../services/foodService";
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { log } from "../services/logService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import FoodsTable from "./FoodsTable";
import SearchBoxForm from "./common/SearchBoxForm";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    searchQuery: "",
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategori: DEFAULT_CATEGORY,
    sortColumn: { path: "name", order: "asc" },
  };

  // Downloads categories and foods from mongodb.
  // Adds "all categories" to the category array.
  async componentDidMount() {
    try {
      // act. result.data = categories
      let { data: categories } = await getCategories();

      categories = [DEFAULT_CATEGORY, ...categories];

      const { data: foods } = await getFoods();

      this.setState({ foods, categories });
    } catch (error) {
      console.log("cdm catch in foods.jsx: ", error.message);
      toast.error("Something went wrong");
    }
  }

  // Deletes the item when you click on its Delete button.
  handleDelete = async (food) => {
    const originalFoods = this.state.foods;

    // Filters existing foods array to delete food from state, frontend
    const foods = this.state.foods.filter((f) => f._id !== food._id);

    // fixes bug in selected category, when you delete the last item in a page.
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

    // Deletes food from mongodb, backend
    try {
      await deleteFood(food);
    } catch (error) {
      // No known error messages because front end only has a button.
      console.log("handleDelete in Foods.jsx: ", error.message);
      toast.error("Something went wrong");
      log(error);

      this.setState({ foods: originalFoods });
    }
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleSearch = (searchQuery) =>
    this.setState({ searchQuery, selectedCategori: DEFAULT_CATEGORY });

  handleListGroupClick = (category) =>
    this.setState({
      selectedCategori: category,
      selectedPage: 1,
      searchQuery: "",
    });

  handleStarClick = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  getPaginatedFoods() {
    const {
      pageSize,
      selectedPage,
      selectedCategori,
      searchQuery,
      foods: allFoods,
      sortColumn,
    } = this.state;

    // 1. Filter (Either through category or seachQuery)
    let filteredFoods = allFoods;

    if (selectedCategori._id) {
      filteredFoods = allFoods.filter(
        (f) => f.category._id === selectedCategori._id
      );
    } else if (searchQuery) {
      filteredFoods = allFoods.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
    const {
      pageSize,
      selectedPage,
      selectedCategori,
      categories,
      sortColumn,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.foods;

    const { foods, FilteredCount } = this.getPaginatedFoods();

    return (
      <div className="container mt-4">
        <ToastContainer />
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={categories}
              selectedItem={selectedCategori}
              onListGroupClick={this.handleListGroupClick}
            />
          </div>
          <div className="col-10">
            {this.props.user && (
              <button className="btn-primary">
                <Link
                  className="btn btn-primary"
                  to="/intensive-foods/foods/new"
                >
                  New Food
                </Link>
              </button>
            )}
            {count === 0 ? (
              <p>There are no foods in the database</p>
            ) : (
              <>
                <p>Showing {FilteredCount} foods in the database</p>

                <SearchBoxForm
                  value={searchQuery}
                  onChange={this.handleSearch}
                />
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
