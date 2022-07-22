import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

class Favorite extends Component {
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
