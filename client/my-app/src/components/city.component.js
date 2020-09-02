import React, { Component } from "react";
import axios from "axios";
import API from "../services/api";
import config from "../config/config";
// import HomePage from './homepage.component';
import CityRow from "./cityRow.component";
import './style.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
const authToken = localStorage.getItem("AuthToken");

export default class City extends Component {
  constructor() {
    super();
    this.state = {
      cityErr: "",
      cities: [],
      isFin: true,
      isAvailable: true
    };
  }
  //   https://api.boxberry.ru/json.php?token=d6f33e419c16131e5325cbd84d5d6000&method=CourierListCities
  // componentDidMount() {
  //   API.get(`${config.API_URL}/api/city/getCities`)
  //     .then((response) => {
  //       if (!response.data.success) {
  //         return this.setState({
  //           cityErr: response.data.message,
  //         });
  //       }

  //       let { cities } = this.state;

  //       cities.push(...response.data.data);

  //       return this.setState({ cities });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }



  editPlace = async (e, city) => {
    e.preventDefault();
    const formData = {
      id: city._id,
      delivery: e.target.value
    }
    const editCity = await API.post(`${config.API_URL}/api/city/editCities`, formData, {
      headers: {
        Authorization: authToken
      }
    });
   return this.changePlace(this.state.isFin)
  }


  changePlace = async (checked) => {

    await this.setState({ isFin: checked })
    if (this.state.isFin) {
       const getFin = await API.get(`${config.API_URL}/api/city/getFinCities`, {
        headers: {
          Authorization: authToken
        }
      })
      let { cities } = this.state;
      cities = [];
      cities.push(...getFin.data.data);

      return this.setState({ cities });
    }

    else {

      const getGuru = await API.get(`${config.API_URL}/api/city/getGuruCities`, {
        headers: {
          Authorization: authToken
        }
      })
      let { cities } = this.state;
      cities = [];
      cities.push(...getGuru.data.data);
       return this.setState({ cities });
       
    }

  }

  changeStatus = async (checked)=>{
    await this.setState({ isAvailable: checked })
    
    console.log(this.state.isAvailable);

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
              checked={this.state.isAvailable}
              onChange={(checked) => {
                this.changeStatus(checked)
              }}
              // onChange={(checked) => {
              //     this.setState({ isUserAdmin: checked })
              // }}
              width={120}
            />

            <div style={{ textAlign: 'right' }}>
              <BootstrapSwitchButton

                onlabel='Fin'
                offlabel='Guru'
                onstyle="dark"
                checked={this.state.isFin}
                onChange={(checked) => {
                  this.changePlace(checked)
                }}

                width={80}
              />
            </div>
            

            {/* <CreateBank /> */}
            {/* <BootstrapSwitchButton checked={true} onstyle="success" /> */}
            <div className="table-responsive" style={{ maxHeight: '75vh', marginTop: '30px' }}>
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
            </div>
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
