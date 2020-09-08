import React, { Component } from "react";
import axios from "axios";
import API from "../services/api";
import config from "../config/config";
import HomePage from "./homepage.component";

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      loginErr: "",
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken) this.props.history.push("/homepage");
  }

  handleLoginChange = (event) => {
    const login = event.target.value;

    this.setState({
      login,
    });
  };
  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({
      password,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { login, password } = this.state;
    const formData = {
      login,
      password,
    };
    API.post(`${config.API_URL}/api/auth/login`, formData)
      .then((response) => {
        if (!response.data.success) {
          return this.setState({
            loginErr: response.data.message,
          });
        }

        this.setState(() => ({ loginErr: "" }));

        // decided not to go deep with the token

        localStorage.setItem("login", "true");
        localStorage.setItem("AuthToken", response.data.data);
        // console.log(response);
        //

        return this.props.history.push("/homepage");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-12"
            style={{
              backgroundImage: "linear-gradient(to bottom right, black, white)",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="col-md-4"
              style={{ height: "320px", backgroundColor: "white" }}
            >
              <div className="row">
                <div
                  className="col-md-12"
                  style={{
                    backgroundColor: "#FFCC00",
                    fontSize: "1.6em",
                    padding: "10px 30px",
                  }}
                >
                  <span style={{ color: "black" }}>ФинДоставка</span>
                </div>
                <div className="col-md-12" style={{ marginTop: "20px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Login</label>
                      <input
                        type="text"
                        name="text"
                        onChange={this.handleLoginChange}
                        className="form-control"
                        required
                        placeholder="Enter login"
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={this.handlePasswordChange}
                        className="form-control"
                        required
                        placeholder="Enter password"
                      />
                    </div>

                    {
                      <span style={{ color: "red" }}>
                        {this.state.loginErr}
                      </span>
                    }

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#FFCC00",
                        borderColor: "#FFCC00",
                        color: "black",
                      }}
                      className="btn btn-primary btn-block"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
