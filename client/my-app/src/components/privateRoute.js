import React from "react";
import { Route, Redirect } from "react-router-dom";
import SideBar from "./sidebar/index.js";


const PrivateRoute = ({ component: Component, ...rest }) => 
    <Route
        {...rest} 
        render={props => (
            localStorage.getItem("AuthToken") ? <>
                <div className='col-md-12' style={{height: '60px', backgroundColor: '#333333', color: '#BBBBBB'}}><div className="row"><div className='col-md-2' style={{height: '60px', padding: '10px 40px'}}><span style={{color: 'white', fontSize: '22px'}}>Findostavka</span></div></div></div>
                <div style={{display: "flex"}}>
                    <div style={{backgroundColor: '#333333', height: '100vh', padding: "0", flex: "0 0 180px"}}>
                        <SideBar />
                    </div>
                    <Component {...props} />
                </div>
            </>
            : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )}
    />;

export default PrivateRoute;