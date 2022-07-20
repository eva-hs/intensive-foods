import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

class Favorite extends Component {
  // 1. Installera Fonten.
  // 2. importera fonten till denna komponent.
  // 3. Skapa en icon som har ett onClick event.
  //    Eventet ska toggla onOff-variabeln så den agerar tvärt om nästa
  //    gång man trycker på stjärnan och anropar eventet. Här behöver vi använda
  //    setState.
  // 4. Då vi endast ska ändra på en rad när vi klickar behöver vi göra 5 steg
  //    (som vid increment i Cart-projektet).
  //    Allt behöver ligga i App och sedan skickas hit som props.
  // 5. Vi behöver även en funktion som ger formatet på knappen.
  //    Denna funktion bör kunna ligga här.

  state = {
    isFavorite: false,
  };

  // Eventet ska toggla isFavorite-variabeln så den agerar tvärt om nästa
  // gång man trycker på stjärnan och anropar eventet. Här behöver vi använda
  // setState.
  handleClickStar = (isFavorite) => {
    isFavorite = !isFavorite;
    this.setState({ isFavorite });
    console.log("star should change");
  };

  render() {
    return (
      <i
        className="fa-solid fa-star"
        onClick={() => this.handleClickStar(this.state.isFavorite)}
      />
    );
  }
}
export default Favorite;
