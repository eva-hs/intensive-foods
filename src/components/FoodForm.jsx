import React from "react";
import Joi from "joi";
import Form from "./common/Form";

class FoodForm extends Form {
  state = {
    data: {
      name: "",
      category: "",
      numberInStock: "",
      price: "",
    },
    errors: { name: "", category: "", numberInStock: "", price: "" },
  };

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    category: Joi.string().required().label("Category"),
    numberInStock: Joi.number().required().label("Number in stock"),
    price: Joi.number().required().label("Price"),
  });

  doSubmit = () => {
    this.props.history.push("/intensive-foods/foods");
  };

  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <h1>Food Form {this.props.match.params.id}</h1>
        {this.renderInput("name", "Name")}
        {this.renderInput("category", "Category")}
        {this.renderInput("numberInStock", "Number in stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
