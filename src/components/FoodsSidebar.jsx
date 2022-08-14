import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "./common/ListGroup";

// Ej klar utan endast test. Är inte kopplad någonstans

function FoodsSidebar({ items, selectedItem, onListGroupClick }) {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={categories}
            selectedItem={selectedCategori}
            onListGroupClick={this.handleListGroupClick}
          />
        </div>
      </div>
    </div>
  );
}

export default FoodsSidebar;
