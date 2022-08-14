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
  /*
  Jag är inte helt nöjd med nedan lösning, men jag kommer inte på ett bättre
  sätt att lösa det. När jag lägger upp en ny food - så ger fakefoodservice
  tillbaka ett _id som verkar vara av datatypen Number.
  De befintliga foodsen i fakefoodservice har _id av datatypen String.
  getFood-funktionen kräver att _id är en string annars ger den undefined.
  MEN använder jag typeof på en nyupplagd food, så säger systemet ändå att
  det är en String? Jag går förbi detta genom en if - else.
  Jag tänker också att när getFood-funktionen ger undefined ska den
  egentligen användas till att få upp ett nytt formulär, men det kan jag inte.
  */

  componentDidMount() {
    let data = "";

    if (this.id === "new") return;
    else if (getFood(this.id) === undefined) {
      data = getFood(parseInt(this.id));
      /*
      Koden fungerar när jag ändrar på adressen från en ursprunglig food,
      men inte om jag lägger upp en ny food och sedan ändrar adressen.
      Detta beror på att när jag ändrar i adressfältet så läses sidan in på
      nytt och min foods-array från fakefoodservice är återigen 9 foods lång.

      Jag behöver backa två gånger och kommer tillbaka till min foods-lista.
      När vi kopplar mot en databas så kommer en ny food att vara kvar även
      efter att sidan läses in igen. Så denna bug är endast i koden så länge
      inte inte har koppla mot en databas.

      Detta fungerar i github :)
      */

      if (data === undefined) {
        this.props.history.replace("/intensive-foods/not-found");
        return;
      }
    } else {
      data = getFood(this.id);
    }

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
