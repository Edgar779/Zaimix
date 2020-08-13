import React from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Signin from "./components/signin.component";
// import SignUp from "./components/signup.component";
// import HomePage from './components/homepage.component';
import NotFound from './components/notfound.component';
import HomePage from './components/homepage.component';
import Users from './components/users.component';
import Banks from './components/banks.component';
import PrivateRoute from "./components/privateRoute";
import City from "./components/city.component";

function App() {
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Signin} />
            <PrivateRoute exact path='/homepage' component={HomePage} />
            <PrivateRoute exact path='/homepage/users' component={Users} />
            <PrivateRoute exact path='/homepage/banks' component={Banks} />
            <PrivateRoute exact path='/homepage/cities' component={City} />
            <Route component={NotFound} />
          </Switch>
        
    
    </div></Router>
  );
}

export default App;
