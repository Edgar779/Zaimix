import React, { Component } from "react";
import axios from 'axios';
import API from '../services/api';
import config from '../config/config';
// import HomePage from './homepage.component';

export default class City extends Component {
    constructor() {
        super();
        this.state = {
          cityErr: '',
          cities: []
        };
      }
    //   https://api.boxberry.ru/json.php?token=d6f33e419c16131e5325cbd84d5d6000&method=CourierListCities
      componentDidMount(){
        API.get(`${config.API_URL}/api/city/getCities`)
        .then((response) => {
console.log(response.data);
            if(!response.data.success){

                return this.setState({
                    cityErr: response.data.message
                })

            }

            let { cities } = this.state;

            cities.push(...response.data.data);

            return this.setState({cities});
            
        })
        .catch(function (error) {
        console.log(error);   
        });
      }
   
    render() {

        const {cities} = this.state;

        return (
            <div className="container-fluid">
                <div className="row">

                {cities.map(city => <div key={city.id}>{city.City}-----{city.Region}------<input type="button" value="Edit" /></div>)}

                    {/* <i class="fa fa-bars" aria-hidden="true" style={{fontSize: '50px'}}></i> */}


                    </div>
            
                </div>
               
        );
    }
}