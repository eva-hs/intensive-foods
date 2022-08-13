import React from "react";
import Joi from "joi";
import Form from "./common/Form";
import { saveFood, getFoods } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";

class FoodForm extends Form {
  state = {
    data: {
      name: "",
      categoryId: "",
      numberInStock: "",
      price: "",
    },
    errors: { name: "", categoryId: "", numberInStock: "", price: "" },
  };

  items = getCategories();

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
  });

  doSubmit = () => {
    console.log(this.state.data);
    saveFood(this.state.data);
    const newFood = getFoods();
    console.log(newFood);
    this.props.history.push("/intensive-foods/foods");
  };

  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <h1>Food Form {this.props.match.params.id}</h1>
        {this.renderInput("name", "Name")}
        {this.renderInputDropDown(this.items, "categoryId", "Category")}
        {this.renderInput("numberInStock", "Number in stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
