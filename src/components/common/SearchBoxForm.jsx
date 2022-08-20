import React from "react";

function SearchBoxForm({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default SearchBoxForm;
