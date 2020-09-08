import React, { Component } from "react";
import axios from 'axios';
import API from '../services/api';
import config from '../config/config';
// import HomePage from './homepage.component';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      loginErr: '',
      isOpen: "block",
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem('AuthToken');
    // const isLogin = localStorage.getItem("login");
    // if(isLogin) this.props.history.push('/homepage'); 
  }
  open = (event) => {
    this.setState({ isOpen: "none" })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">

        </div>

      </div>

    );
  }
}