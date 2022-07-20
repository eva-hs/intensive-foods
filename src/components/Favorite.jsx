import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

class Favorite extends Component {
  render() {
    return this.props.onOff === true ? (
      <i className="fa-solid fa-star" />
    ) : (
      <i className="fa-regular fa-star" />
    );
  }

  toggleStarFormat(onOff) {
    return onOff === true ? "fa-solid fa-star" : "fa-light fa-star";
    onOff = !onOff;
  }
}
export default Favorite;
