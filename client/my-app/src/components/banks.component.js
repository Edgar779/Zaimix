import React, { Component } from "react";
import axios from 'axios';
import API from '../services/api';
import config from '../config/config';
// import HomePage from './homepage.component';
import BankRow from "./bankRow.component";
import {CreateBank} from "./modal";

export default class Banks extends Component {
    constructor() {
        super();
        this.state = {
            bankRes: '',
            banks: []
        }
    }

    componentDidMount() {
        const authToken = localStorage.getItem("AuthToken");

        API.get(`${config.API_URL}/api/bank/getBanks`, {
            headers: {
                Authorization: authToken
            }
        })
            .then((response) => {
                if (!response.data.success) {

                    return this.setState({
                        banksErr: response.data.message
                    })
                }

                let { banks } = this.state;

                banks.push(...response.data.data);

                return this.setState({ banks });

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    editBank = async (e, bank) => {
        e.preventDefault();

        const formData = {
            _id: bank._id,
            officialName: bank.officialName,
            localName: bank.localName,
            authToken: bank.authToken,
            active: bank.active,
        };

        const authToken = localStorage.getItem("AuthToken");
        const updateBank = await API.post(`${config.API_URL}/api/bank/updateBank`, formData, {
            headers: {
                Authorization: authToken,
            },
        })

        return this.setState({ bankRes: updateBank.data.message });
    };

    render() {
        const { banks } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ padding: "20px" }}>

                        <CreateBank />

                        <h2> {this.state.bankRes} </h2>

                        {/* <h2 style={{ color: "red" }}>{this.state.workersErr}</h2>
                <h2 style={{ color: "green" }}>{this.state.updateWorkerStatus}</h2> */}

                        <table className="table">
                            <tr>
                                <th>id</th>
                                <th>local name</th>
                                <th>full name</th>
                                <th>token</th>
                            </tr>
                            {banks.map((bank) => {
                                return <BankRow bank={bank} editBank={this.editBank} />;
                            })}
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}