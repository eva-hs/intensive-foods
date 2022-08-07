import React from "react";

function Input({ name, label, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        className="form-control"
        id={name}
      />
    </div>
  );
}

export default Input;
