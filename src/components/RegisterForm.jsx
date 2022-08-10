import React from "react";
import Joi from "joi";
import Form from "./common/Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {
      username: "",
      password: "",
      name: "",
    },
  };

  schema = Joi.object({
    username: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().empty("").label("Name"),
  });

  doSubmit = () => {
    console.log("Användaren registreras");
  };
  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
