import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

class Favorite extends Component {
  // 1. Installera Fonten.
  // 2. importera fonten till denna komponent.
  // 3. Skapa en icon som har ett onClick event.
  //    Eventet ska toggla isFavorite-variabeln så den agerar tvärt om nästa
  //    gång man trycker på stjärnan och anropar eventet. Här behöver vi använda
  //    setState.
  // 5. Vi behöver även en funktion som ger formatet på knappen.
  // 6. Då denna ska vara "stand alone" lägger jag alla funktioner här.

  state = {
    isFavorite: false,
  };

  // Eventet ska toggla isFavorite-variabeln så den agerar tvärt om nästa
  // gång man trycker på stjärnan och anropar eventet. Här behöver vi använda
  // setState.
  handleClick = (isFavorite) => {
    isFavorite = !isFavorite;
    this.setState({ isFavorite });
  };

  render() {
    return (
      <i
        style={{ cursor: "pointer" }}
        className={this.formatStarClasses()}
        onClick={() => this.handleClick(this.state.isFavorite)}
      />
    );
  }

  formatStarClasses() {
    let classes = "fa-star fa-";
    classes += this.state.isFavorite ? "solid" : "regular";
    return classes;
  }
}
export default Favorite;
