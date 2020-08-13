import React from "react";
// import { slide as Menu } from "react-burger-menu";
import "./styles.css";

export default props => {
  return (
    <ul>
        <li style={{listStyle: 'none'}}>
            <a className="menu-item" href="/homepage/users">
            <i className="fa fa-users" aria-hidden="true" style={{color: 'white'}}></i>
                    <span style={{color: 'white', fontSize: '20px', marginLeft: '8px'}}>Users</span>
            </a>          
        </li>
        <li style={{listStyle: 'none'}}>
            <a className="menu-item" href="/homepage/banks">
                <i className="fa fa-university" aria-hidden="true" style={{color: 'white'}}></i>
                    <span style={{color: 'white',  fontSize: '20px', marginLeft: '8px'}}>Bank</span>
            </a>          
        </li>
        <li style={{listStyle: 'none'}}>
            <a className="menu-item" href="/homepage/cities">
                <i className="fa fa-building" aria-hidden="true" style={{color: 'white'}}></i>
                    <span style={{color: 'white',  fontSize: '20px', marginLeft: '8px'}}>City</span>
            </a>          
        </li>
    </ul>
  );
};
