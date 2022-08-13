import React from "react";
import Joi from "joi";
import Form from "./common/Form";
import { saveFood, getFood } from "../fakeFoodService";
import { getCategories } from "../fakeCategoryService";

class FoodForm extends Form {
  //_id och category needs to be in the stat and the Joi-schema from start, or
  // else it causes problems when clicking on an existing food and saves it.
  state = {
    data: {
      name: "",
      category: {},
      categoryId: "",
      numberInStock: "",
      price: "",
      _id: "",
    },
    errors: {
      name: "",
      category: {},
      categoryId: "",
      numberInStock: "",
      price: "",
      _id: "",
    },
  };

  // Jag är inte helt nöjd med nedan lösning, men jag kommer inte på ett bättre
  // sätt att lösa det. När jag lägger upp en ny food - så ger fakefoodservice
  // tillbaka ett _id som verkar vara av datatypen Number.
  // De befintliga foodsen i fakefoodservice har _id av datatypen String.
  // getFood-funktionen kräver att _id är en string annars ger den undefined.
  // MEN använder jag typeof på en nyupplagd food, så säger systemet ändå att
  // det är en String? Jag går förbi detta genom en if - else.
  // Jag tänker också att när getFood-funktionen ger undefined ska den
  // egentligen användas till att få upp ett nytt formulär, men det kan jag inte.

  componentDidMount() {
    let data = "";
    if (this.id === "new") return;
    else if (getFood(this.id) === undefined) {
      data = getFood(parseInt(this.id));
    } else data = getFood(this.id);

    data.categoryId = data.category._id;

    const errors = {};

    this.setState({ data, errors });
  }

  // Is used for getting an existing foods data in componentDidMount.
  id = this.props.match.params.id;

  // Is used for content in the dropdown-list.
  categoryItems = getCategories();

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    category: Joi.object().empty({}).label("Category"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
    _id: Joi.any().empty("").label("_id"),
  });

  doSubmit = () => {
    saveFood(this.state.data);

    this.props.history.push("/intensive-foods/foods");
  };

  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <h1>Food Form</h1>
        {this.renderInput("name", "Name")}
        {this.renderInputDropDown(this.categoryItems, "categoryId", "Category")}
        {this.renderInput("numberInStock", "Number in stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
