import React from "react";

function InputDropDown({ items, name, label, value, onChange, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        onChange={onChange}
        value={value}
        className="form-select"
        id={name}
        name={name}
      >
        <option value=""></option>

        {items.map((item) => {
          return <option value={item._id}>{item.name}</option>;
        })}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default InputDropDown;
