import React from "react";
import Joi from "joi";
import http from "./services/httpService";
import Form from "./common/Form";
import config from "../config.json";
import { toast } from "react-toastify";

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

  async componentDidMount() {
    // Is used for content in the dropdown-list.
    try {
      const { data: categories } = await http.get(config.apiEndpointCategories);
      this.setState({ categories });
    } catch (error) {
      console.log(
        "cdm, get categories, catch in foodForm.jsx: ",
        error.message
      );
      toast.error("Something went wrong");
    }

    const id = this.props.match.params.id;

    // when id is new, an empty form will open.
    if (id === "new") return;

    // when id is other than new, a form filled with the food will open.
    const { data } = await http.get(`${config.apiEndpointFoods}/${id}`);

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

  mapToDatabaseModel(data) {
    return {
      name: data.name,
      categoryId: data.categoryId,
      numberInStock: data.numberInStock,
      price: data.price,
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

  // Either creates or updatades a new food in mongodb.
  doSubmit = async () => {
    const { _id: id } = this.state.data;

    // Mongodb does not accept that we sends the _id in the food object.
    const food = this.mapToDatabaseModel(this.state.data);

    // Either creates or updatades a new food in mongodb.
    if (!id) {
      await http.post(config.apiEndpointFoods, food);
    } else {
      await http.put(`${config.apiEndpointFoods}/${id}`, food);
    }

    // Sends you back to the foodtable and the table updates in foods cdm.
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
