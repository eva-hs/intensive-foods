import React from "react";

// Jag har lagt till placeholder och inBoxLabel för de som vill ha
// hjälptext i rutan

function Input({ name, label, value, onChange, error, inBoxLabel }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={name === "password" ? "password" : ""}
        onChange={onChange}
        value={value}
        className="form-control"
        id={name}
        name={name}
        placeholder={inBoxLabel}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
