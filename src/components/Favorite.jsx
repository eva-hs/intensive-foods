import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

class Favorite extends Component {
  // Eventet ska toggla isFavorite-variabeln så den agerar tvärt om nästa
  // gång man trycker på stjärnan och anropar eventet. Här behöver vi använda
  // setState.

  render() {
    // Formats the star depending on isFavorites value.
    let formatStarClasses = "fa-star fa-";
    formatStarClasses += this.props.isFavorite ? "solid" : "regular";

    return (
      <i
        style={{ cursor: "pointer" }}
        className={formatStarClasses}
        onClick={this.props.onStarClick}
      />
    );
  }
}
export default Favorite;
