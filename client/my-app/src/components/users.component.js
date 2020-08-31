import React, { useState, Component } from "react";
import axios from "axios";
import API from "../services/api";
import config from "../config/config";
import HomePage from "../components/homepage.component";
import {CreateWorker} from "./modal";
import UserRow from "./usersRow.component";
// import HomePage from './homepage.component';

const array = [
  {
    1: "superadmin",
    2: "admin",
    3: "operator",
    4: "verificator",
    5: "logist",
    6: "curier",
  },
];


export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      workersErr: "",
      workers: [],
      updateWorkerStatus: "",
    };
  }

  editWorker = (e, worker) => {
    e.preventDefault();
    this.setState({
      workersErr: "",
      updateWorkerStatus: "",
      isAdmin: true
    });

    const formData = {
      id: worker._id,
      name: worker.name,
      login: worker.login,
      password: worker.password,
      role: worker.role,
    };
//     if(worker.password.trim() !== null && worker.password.trim() != "" && worker.password != undefined){
//      formData.password = worker.password
//      console.log(formData);

//     }

// console.log(formData);
    const authToken = localStorage.getItem("AuthToken");
    API.post(`${config.API_URL}/api/workers/updateWorker`, formData, {
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        if (!response.data.success) {
          return this.setState({
            workersErr: response.data.message,
          });
        }
        return this.setState({
          updateWorkerStatus: response.data.message,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  componentDidMount() {
    const authToken = localStorage.getItem("AuthToken");

    API.get(`${config.API_URL}/api/workers/getWorkers`, {
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        if (!response.data.success) {
          return this.setState({
            workersErr: response.data.message,
          });
        }

        let { workers } = this.state;
       
        workers.push(...response.data.data);

        this.setState({ workers });
      })
      .catch(function (error) {

        console.log(error);
      });
  }

  render() {
    const { workers } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8" style={{ padding: "20px" }}>
          
          <CreateWorker workers={this.state.workers} role={array} />

            <h2 style={{ color: "red" }}>{this.state.workersErr}</h2>
            <h2 style={{ color: "green" }}>{this.state.updateWorkerStatus}</h2>

            <table className="table">
              <tr>
                <th>Name</th>
                <th>Login</th>
                <th>Group</th>
              </tr>
              {workers.map((worker) => {

                let {password, ...data} = worker;
                
                return <UserRow worker={data} editWorker={this.editWorker} />;
              })}
            </table>

          </div>
        </div>
      </div>
    );
  }
}
