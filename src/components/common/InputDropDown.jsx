import React from "react";

function InputDropDown({
  options,
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
}) {
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
        <option value={placeholder}></option>

        {options.map((item) => {
          return (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default InputDropDown;
