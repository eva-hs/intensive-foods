import React from "react";
import Joi from "joi";
import Form from "./Form";

// Ärver från Form.jsx.
// Nytt formulär behöver state med data och errors, Joi-schema och doSubmit.
// Kan sedan använda renderInput och renderButton från Form.
// Ärver även från Component genom föräldrarkomponenten Form

class SearchBoxForm extends Form {
  state = {
    data: { searchData: "" },
    errors: { searchData: "" },
  };

  schema = Joi.object({
    searchData: Joi.string().empty("").label("SearchData"),
  });

  // Vad ska hända när man tycker på knappen?
  doSubmit = () => {
    const { searchData } = this.state.data;
    const { onSearch } = this.props;

    // När jag fyller i en bokstav och trycker enter ska jag filtrera på
    // namn i min foods-array. och presentera i foodslistan.

    //  Därför tänker jag att i denna funktion endast kallar på en ny
    // funktion i Foods.jsx.
    onSearch(searchData);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("searchData", "", "Search...")}
      </form>
    );
  }
}

export default SearchBoxForm;
