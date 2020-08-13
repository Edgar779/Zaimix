import React, { Component } from "react";
import axios from 'axios';
import API from '../services/api';
import config from '../config/config';
import HomePage from '../components/homepage.component'
// import HomePage from './homepage.component';

export default class Users extends Component {
    constructor() {
        super();
          this.state = {
            workersErr: '',
            workers: [],
            updateWorkerStatus: ''
          }
      }

    //   componentDidMount(){
    //     const authToken = localStorage.getItem("AuthToken");
    //     if(authToken) this.props.history.push('/homepage/users');  
    //   }
    editWorker = (e) =>{
      const formData = {
        id: '5f2fb2f175bf1c2414db2add',
        name: "Verif",
        login: 'Verif',
        password: '',
        role: 3
      }

      const authToken = localStorage.getItem("AuthToken");
      API.post(`${config.API_URL}/api/workers/updateWorker`, formData, {
          headers: {
             Authorization: authToken
          }
      })
      .then((response) => {
          if(!response.data.success){

              return this.setState({
                  workersErr: response.data.message
              })

          }
          return this.setState({
            updateWorkerStatus: response.data.data.message
          })
       
      })
      .catch(function (error) {
      console.log(error);
    
      });



    }
      componentDidMount(){
        const authToken = localStorage.getItem("AuthToken");

        API.get(`${config.API_URL}/api/workers/getWorkers`, {
            headers: {
               Authorization: authToken
            }
        })
        .then((response) => {
            if(!response.data.success){

                return this.setState({
                    workersErr: response.data.message
                })

            }

            let { workers } = this.state;

            workers.push(...response.data.data);
    
            return this.setState({workers});
                        
        })
        .catch(function (error) {
            console.log(error);    
        });
        
      
      }
     

    render() {
        const array = [{1: 'superadmin', 2: 'admin', 3: 'operator', 4: 'verificator', 5: 'logist', 6: 'curier'}];
        const {workers} = this.state;
        return (
           
          <div>
            {workers.map(worker => <div key={worker.id}>{worker.name}{worker.login}{array[0][worker.role]}<input type="button" value="Edit" onClick={this.editWorker} /></div>)}
          </div>
               
        );
    }
}