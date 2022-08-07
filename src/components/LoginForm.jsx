import React, { Component } from "react";
import Input from "./common/Input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("form ha been submitted");
  };

  handleChange = ({ target: input }) => {
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={this.handleChange}
        />

        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default LoginForm;
