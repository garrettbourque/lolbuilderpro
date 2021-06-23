import React from 'react'
import { NavLink } from 'react-router-dom'

const linkStyles = {
    width: "25px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "black",
    textDecoration: "none",
    color: "white",
  };

let NavBar = () => {
    return (<div className="NavBar">
        <NavLink
            to="/"
            exact
            style={{linkStyles}}
            activeStyle={{background: 'white'}}
        > Home
        </NavLink>
        <NavLink
            to="/newbuild"
            exact
            style={{linkStyles}}
            activeStyle={{background: 'white'}}
        > New Build
        </NavLink>
        <NavLink
            to="/savedbuilds"
            exact
            style={{linkStyles}}
            activeStyle={{background: 'white'}}
        > Saved Builds
        </NavLink>
        <NavLink
            to="/play"
            exact
            style={{linkStyles}}
            activeStyle={{background: 'white'}}
        > Play
        </NavLink>
    </div>)

}

export default NavBar