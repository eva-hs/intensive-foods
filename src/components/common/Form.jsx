import React, { Component } from "react";
import Input from "./Input";
import InputDropDown from "./InputDropDown";

class Form extends Component {
  // Abstrakt component, har ingen render()

  // Statet heter samma både här och i formuläret under.
  // Då skrivs statet över med infon i formuläret under.
  state = {
    data: {},
    errors: {},
  };

  // Tar in alla fel i formuläret och sparar i error.
  // Använder Joi-schemat i formuläret under.
  // Om error är tom returneras inget.
  // Annars, lopar över errors och sparar errormeddelandet under rätt property.
  validate() {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return null;

    const errors = {};
    for (const detail of error.details)
      errors[detail.context.key] = detail.message;
    return errors;
  }

  // Validerar inputruta för inputruta. Extraherar reglerna från Joi-schemat
  // för just den rutan. Om inga fel görs inget,
  // annars returneras errormeddelandet
  validateProperty({ name, value }) {
    const subSchema = this.schema.extract(name);
    const { error } = subSchema.validate(value);

    if (!error) return null;

    return error.message;
  }

  // Kollar Inputrutan och för varje knapptryckning valideras det mot
  // validateProperty(). Felen sparas i state.
  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  // Förhindrar defaultflödet, att ladda om sidan helt.
  // Om validate() hittar fel så sparas dessa i errors. Statet uppdateras med
  //errors eller ett tomt objekt då det inte får vara null eller undefined.
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  // Hjälpfunktion så du enkelt kan rendera submit-knapp i formuläret.
  // Knappen är avaktiverad när validate är sant.
  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  // Hjälpfunktion så du enkelt kan rendera Input-rutorna i formuläret.

  // Jag har lagt till inBoxLabel - kolla om den ska vara i searchbox med

  renderInput(name, label, inBoxLabel, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        inBoxLabel={inBoxLabel}
      />
    );
  }

  // Hjälpfunktion så du enkelt kan rendera en dropdown-lista i formuläret.
  renderInputDropDown(items, name, label) {
    const { data, errors } = this.state;
    return (
      <InputDropDown
        items={items}
        type={name}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
