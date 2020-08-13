import React, { Component } from "react";
import axios from 'axios';
import API from '../services/api';
import config from '../config/config';
// import HomePage from './homepage.component';

export default class Banks extends Component {
    constructor() {
        super();
        this.state = {
            banksErr: '',
            banks: []
        }
       
      }

      componentDidMount(){
        const authToken = localStorage.getItem("AuthToken");

        API.get(`${config.API_URL}/api/bank/getBanks`, {
            headers: {
               Authorization: authToken
            }
        })
        .then((response) => {
            if(!response.data.success){

                return this.setState({
                    banksErr: response.data.message
                })

            }

            let { banks } = this.state;

            banks.push(...response.data.data);
            
           return this.setState({banks});
            
        })
        .catch(function (error) {
            console.log(error);    
        });
        
      }




    render() {
        const {banks} = this.state;

        return (
            <div>
            {banks.map(bank => <div key={bank.id}>{bank.id}{bank.officialName}{bank.localName}{bank.authToken}</div>)}
          </div>
               
        );
    }
}