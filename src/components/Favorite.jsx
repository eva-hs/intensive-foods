import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

class Favorite extends Component {
  // 1. Installera Fonten.
  // 2. importera fonten till denna komponent.
  // 3. Skapa en icon som har ett onClick event.
  //    Eventet ska ge olika utseende på stjärnen beroende på om variabeln onOff
  //    är true eller false.
  //    Sedan ska eventet toggla onOff-variabeln så den agerar tvärt om nästa
  //    gång man trycker på stjärnan och anropar eventet. Här behöver vi använda
  //    setState.
  // 4. Då vi endast ska ändra på en rad när vi klickar behöver vi göra 5 steg
  //    (som vid increment i Cart-projektet).
  //    Allt behöver ligga i App och sedan skickas hit som props.

  render() {
    return (
      <i onClick={this.props.onClickStar(this.props.id, this.props.onOff)} />
    );
  }
}
export default Favorite;
