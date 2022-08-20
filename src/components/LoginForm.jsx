import React from "react";
import Joi from "joi";
import Form from "./common/Form";

// Ärver från Form.jsx.
// Nytt formulär behöver state med data och errors, Joi-schema och doSubmit.
// Kan sedan använda renderInput och renderButton från Form.
// Ärver även från Component genom föräldrarkomponenten Form
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {
      username: "",
      password: "",
    },
  };

  // Installerat biblioteket Joi. Sätter reglerna för mina inputfält.
  schema = Joi.object({
    username: Joi.string().required().min(2).label("Username"),
    password: Joi.string().required().min(4).label("Password"),
  });

  // Vad ska hända när man tycker på knappen?
  doSubmit = () => {
    console.log("Logga in");
  };
  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <h1>Log in</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "", "password")}
        {this.renderButton("Log in")}
      </form>
    );
  }
}

export default LoginForm;
