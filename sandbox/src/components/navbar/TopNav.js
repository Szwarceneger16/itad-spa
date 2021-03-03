import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect
  } from "react-router-dom";
import './topNav.css'
import logo from './../../img/grupa-net-gear--color.ico'

function toggleTopNav(e) {
    e.preventDefault();
    //debugger;
    e.target.parentElement.parentElement.classList.toggle('responsive');
    //document.getElementById("main").style.marginLeft = "250px";
  }

function MyLink({ label, to, activeOnlyWhenExact }) {
    let match = !!useRouteMatch({
      path: to,
      exact: true
    });
    let clas = {active: match , 'no-hide': (label === 'Login')};
  
    return (
        <Link 
            className={`${match ? "active" : ""} ${(label === 'Login') ? 'no-hide' : ''}`}
            to={to}
        >
            {label}
        </Link>
    );
}

function TopNav({ route }) {
    return (
        <div id="myTopnav" className="top-nav-bar">
            <Link 
                className={'logo'}
                to={'/'}
            >
                <img src={logo} />
            </Link>
            {route.map( el => {
                return (<MyLink key={'top'+el.name} to={el.to} label={el.name} />)
            })}
            <div className="open-vertically" onClick={toggleTopNav}>
                <i className="fa fa-bars"></i>
            </div>
        </div>
    );
}

export default TopNav;