import React from "react";
import Joi from "joi";
import Form from "./common/Form";
import { saveFood, getFood } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";

class FoodForm extends Form {
  state = {
    data: {
      name: "",
      categoryId: "",
      numberInStock: "",
      price: "",
      _id: "",
    },
    errors: {},
    categories: [],
  };

  componentDidMount() {
    // Is used for content in the dropdown-list.
    const categories = getCategories();
    this.setState({ categories });

    const id = this.props.match.params.id;

    // when id is new, an empty form will open.
    if (id === "new") return;

    // when id is other than new, a form filled with the food will open.
    const data = getFood(id);
    if (!data) return this.props.history.replace("/intensive-foods/not-found");

    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(data) {
    return {
      name: data.name,
      categoryId: data.category._id,
      numberInStock: data.numberInStock,
      price: data.price,
      _id: data._id,
    };
  }

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
    _id: Joi.string().allow(""),
  });

  doSubmit = () => {
    saveFood(this.state.data);

    this.props.history.push("/intensive-foods/foods");
  };

  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderInputDropDown(
          this.state.categories,
          "categoryId",
          "Category"
        )}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
