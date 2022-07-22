import React from "react";

function Favorite({ isFavorite, onStarClick }) {
  // Formats the star depending on isFavorites value.
  let formatStarClasses = "fa-star fa-";
  formatStarClasses += isFavorite ? "solid" : "regular";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={formatStarClasses}
      onClick={onStarClick}
    />
  );
}

export default Favorite;
