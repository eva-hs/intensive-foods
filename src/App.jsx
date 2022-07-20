import React, { Component } from "react";
import { getFoods } from "./fakeFoodService";
import Favorite from "./components/Favorite";
import "@fortawesome/fontawesome-free/css/all.css";

class App extends Component {
  // Skapa state med min array. Arrayen hämtas från fakeFoodService.
  state = {
    foods: getFoods(),
    // Variabel för att toggla Star-knappen.
    onOff: true,
  };

  // När man trycker på knappen delete skapas en ny array som innehåller allt
  // som inte har samma _ID som raden, knappen låg på.
  handleDelete = (_id) => {
    const foods = this.state.foods.filter((food) => food._id !== _id);
    this.setState({ foods });
  };

  render() {
    return this.state.foods.length === 0 ? (
      <p>There are no foods in the database</p>
    ) : (
      <>
        <p>Showing {this.state.foods.length} foods in the database</p>
        {/* Tabellen hämtas ut från arrayen som skapas i state. */}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.numberInStock}</td>
                <td>{food.price}</td>
                <td>
                  {/* Skickar med variabeln onOff till komponenten favorite */}
                  <Favorite onOff={this.state.onOff} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
