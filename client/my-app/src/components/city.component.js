import React, { Component } from "react";
import axios from "axios";
import API from "../services/api";
import config from "../config/config";
import CityRow from "./cityRow.component";
import './style.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { trackPromise } from 'react-promise-tracker';
import { LoadingIndicator } from './loadingIndicator.component.js'
import { Button, Modal, Form } from 'react-bootstrap';

const authToken = localStorage.getItem("AuthToken");

export default class City extends Component {
  constructor() {
    super();
    this.state = {
      cityErr: "",
      cities: [],
      isFin: "",
      isAvailable: true
    };
  }
  componentDidMount() {
    trackPromise(
      API.get(`${config.API_URL}/api/city/getCities`)
        .then((response) => {
          if (!response.data.success) {
            return this.setState({
              cityErr: response.data.message,
            });
          }

          let { cities } = this.state;

          cities.push(...response.data.data);

          return this.setState({ cities });
        })
        .catch(function (error) {
          console.log(error);
        }));
  }

  editPlace = async (e, city) => {
    // e.preventDefault();
    const value = e.target.value;

    const formData = {
      id: city._id,
      delivery: e.target.value
    }
    const editCity = await API.post(`${config.API_URL}/api/city/editCities`, formData, {
      headers: {
        Authorization: authToken
      }
    });

    return this.changePlace()
  }


  changePlace = async (val = null) => {
    const value = val || this.state.isFin
    // await this.setState({ isFin: checked })
    // if(!this.state.isAvailable){
    //     return this.changeStatus()
    // }

    if (value === '1') {
      const getFin = await trackPromise(API.get(`${config.API_URL}/api/city/getFinCities`, {
        headers: {
          Authorization: authToken
        }
      })
      )

      let { cities } = this.state;
      cities = [];
      cities.push(...getFin.data.data);

      return this.setState({ cities, isFin: value });
    }
    else if (value === '2') {
      const getGuru = await API.get(`${config.API_URL}/api/city/getGuruCities`, {
        headers: {
          Authorization: authToken
        }
      })
      let { cities } = this.state;
      cities = [];
      cities.push(...getGuru.data.data);
      return this.setState({ cities, isFin: value });
    }

  }

  changeStatus = async (checked, status) => {
    await this.setState({ isAvailable: true })
    if (checked === true) {
      return this.changePlace('1');
    }
    const getUn = await API.get(`${config.API_URL}/api/city/getUnCities`, {
      headers: {
        Authorization: authToken
      }
    })
    let { cities } = this.state;
    cities = [];
    cities.push(...getUn.data.data);
    return this.setState({ cities, isAvailable: false });

  }


  render() {
    const { cities } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8" style={{ padding: "20px" }}>

            <BootstrapSwitchButton
              onlabel='Available'
              offlabel='Unavailable'
              onstyle="dark"
              checked={this.state.isAvailable}
              onChange={(checked) => {
                this.changeStatus(checked, 'isAvailable')
              }}
              // onChange={(checked) => {
              //     this.setState({ isUserAdmin: checked })
              // }}
              width={120}
            />

            {this.state.isAvailable && <div style={{ marginTop: '20px' }}>
              <Form.Group controlId="exampleForm.ControlSelect1" onChange={(e) => { this.changePlace(e.target.value) }}>
                <Form.Control as="select">

                  <option value="1">Fin</option>
                  <option value="2">Guru</option>

                </Form.Control>
              </Form.Group>
            </div>
            }

            <div className="table-responsive" style={{ maxHeight: '75vh', marginTop: '30px', position: 'relative', minHeight: "500px" }}>


              <table className="table" style={{ marginTop: '10px' }}>

                <tr>
                  <th>City</th>
                  <th>Area</th>
                  <th>Comment</th>
                  <th>Place</th>

                </tr>
                {cities.map((city) => {

                  return <CityRow city={city} editPlace={this.editPlace} />;
                })}

              </table>
              <LoadingIndicator />

            </div>

          </div>

        </div>
      </div>
    );
  }
}
