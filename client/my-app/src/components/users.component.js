import React, { useState, Component } from "react";
import axios from "axios";
import API from "../services/api";
import config from "../config/config";
import HomePage from "../components/homepage.component";
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

const UserRow = ({ worker, editWorker }) => {
  const [workerData, setWorkerData] = useState(worker);
  const [editMode, setEditMode] = useState(false);

  return (
    <tr>
      <td>
        {editMode ? (
          <input
            value={workerData.name}
            onChange={(e) => {
              setWorkerData({
                ...workerData,
                name: e.target.value,
              });
            }}
          />
        ) : (
          workerData.name
        )}
      </td>
      <td>
        {editMode ? <input value={workerData.login}  onChange={(e) => {
              setWorkerData({
                ...workerData,
                login: e.target.value,
              });
            }} /> : workerData.login}
      </td>

      <td>
  
  {editMode ? (<select value={workerData.role} onChange={(e) => {
     setWorkerData({
      ...workerData,
      role: parseInt(e.target.value),
    });
  }}>
          <option value="2">admin</option>
          <option value="3">operator</option>
          <option value="6">curier</option>
        </select>) : 
        (array[0][workerData.role])
        
  }

</td>
{editMode ? (
  <td>
    <input type="text" placeholder="Password" onChange={(e) => {
         setWorkerData({
          ...workerData,
          password: e.target.value,
        });
    }} />
  </td>
): null}
        

      <td>
        <a
          herf="#"
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={(e) => {
            if (editMode) {
              editWorker(e, workerData);
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
        >
          {editMode ? "Save" : "Edit"}
        </a>
      </td>
    </tr>
  );
};

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      workersErr: "",
      workers: [],
      updateWorkerStatus: "",
    };
  }

  //   componentDidMount(){
  //     const authToken = localStorage.getItem("AuthToken");
  //     if(authToken) this.props.history.push('/homepage/users');
  //   }
  editWorker = (e, worker) => {
    e.preventDefault();
    this.setState({
      workersErr: "",
      updateWorkerStatus: "",
    });
    const formData = {
      id: worker._id,
      name: worker.name,
      login: worker.login,
      password: worker.password,
      role: worker.role,
    };

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

        return this.setState({ workers });
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
            <a href="#">Create</a>

            <h2 style={{ color: "red" }}>{this.state.workersErr}</h2>
            <h2 style={{ color: "green" }}>{this.state.updateWorkerStatus}</h2>

            <table className="table">
              <tr>
                <th>Name</th>
                <th>Login</th>
                <th>Group</th>
              </tr>
              {workers.map((worker) => {
                return <UserRow worker={worker} editWorker={this.editWorker} />;
              })}
            </table>

          </div>
        </div>
      </div>
    );
  }
}
