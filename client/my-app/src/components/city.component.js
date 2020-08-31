import React, { Component } from "react";
import axios from "axios";
import API from "../services/api";
import config from "../config/config";
// import HomePage from './homepage.component';
import CityRow from "./cityRow.component";

import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default class City extends Component {
  constructor() {
    super();
    this.state = {
      cityErr: "",
      cities: [],
    };
  }
  //   https://api.boxberry.ru/json.php?token=d6f33e419c16131e5325cbd84d5d6000&method=CourierListCities
  componentDidMount() {
    API.get(`${config.API_URL}/api/city/getCities`)
      .then((response) => {
        console.log(response.data);
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
      });
  }

  render() {
    const { cities } = this.state;
 

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8" style={{ padding: "20px" }}>

          <BootstrapSwitchButton
    checked={false}
    onlabel='Available'
    offlabel='Unavailable'
    onstyle="dark"
    checked={true}
    // onChange={(checked) => {
    //     this.setState({ isUserAdmin: checked })
    // }}
    width={120}
/>

<div style={{textAlign: 'right'}}>
<BootstrapSwitchButton
    checked={false}
    onlabel='Fin'
    offlabel='Guru'
    onstyle="dark"
    checked={true}
    // onChange={(checked) => {
    //     this.setState({ isUserAdmin: checked })
    // }}
    width={80}
/>
</div>

          {/* <CreateBank /> */}
          {/* <BootstrapSwitchButton checked={true} onstyle="success" /> */}

            <table className="table" style={{marginTop: '10px'}}>
 
              <tr>
                <th>City</th>
                <th>Area</th>
                <th>Comment</th>


              </tr>
              {cities.map((city) => {
                // console.log(city);
                return <CityRow city={city} />;
              })}
            </table>
          </div>

          {/* {cities.map((city) => (
            <div key={city.id}>
              {city.City}-----{city.Area}------
              <input type="button" value="Edit" />
            </div>
          ))} */}

          {/* <i class="fa fa-bars" aria-hidden="true" style={{fontSize: '50px'}}></i> */}
        </div>
      </div>
    );
  }
}
