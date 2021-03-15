import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect
  } from "react-router-dom";
import './sideNav.css'

function openNav(e) {
    e.preventDefault();
    document.getElementById("mySidenav").style.width = "100%";
    //document.getElementById("main").style.marginLeft = "250px";
  }
  
function closeNav(e) {
    e.preventDefault();
    document.getElementById("mySidenav").style.width = "0px";
    //document.getElementById("main").style.marginLeft = "0px";
}

function SideNav(props) {
    
    return (
        <div id="mySidenav" className="side-nav-bar" onClick={closeNav}>
            <span className='close-btn'>X</span>
            {route.map( el => {
                return <MyLink key={'side'+el.name} to={el.to} label={el.name} />
            })}
        </div>
    );
}

export default SideNav;