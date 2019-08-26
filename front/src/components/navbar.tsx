import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers";
import { IDecoded, IUser } from "../interfaces";
import * as actions from "../actions";
import "../css/navbar.css";
const materialize = require("react-materialize");

interface IPropsGlobal {
  token: string;
  decoded: IDecoded;
  Reset: () => void;

  users: IUser[];
}

const Navbar: React.FC<IPropsGlobal> = props => {
  // const { Button, Icon, Divider, Dropdown } = require("react-materialize");
  const user = props.users.find(u => u._id === props.decoded._id);

  const logOut = () => {
    props.Reset();
    localStorage.removeItem("token"); // para que elimine el token de la local en el localstorage
  };

  if (!user) {
    return null;
  }

  return (
    // creamos de nuevo un navbar
    <div>
      <materialize.Navbar
        className="black nav"
        fixed={true}
        alignLinks="right"
        
      >
      <materialize.NavItem>
      <Link to="/">
            
              <img
                className="responsive-img object"
                width="70"
                src="/image/objetivo.png"
                alt="logo"
              />
            
          </Link>
        </materialize.NavItem>
       
        <materialize.NavItem >
          <Link to="/users">Users</Link>
        </materialize.NavItem>
        <materialize.NavItem >
          <Link to="/posts">Posts</Link>
        </materialize.NavItem>
        <materialize.NavItem >
          <Link to="/events">Events</Link>
        </materialize.NavItem>
        <materialize.NavItem>
        <img
          width="60"
          className="circle responsive-img avatar"
          src={
            user.avatar
              ? "http://localhost:8080/uploads/avatars/" +
                user.avatar +
                "?" +
                Date()
              : "/image/default-avatar1.jpg"
          }
          alt="avatar"
        />
        </materialize.NavItem>
        <materialize.Dropdown  trigger={<materialize.Button id="btnDrop">
                 {user.username}
                  <materialize.Icon className="material-icons i">arrow_drop_down</materialize.Icon>
                </materialize.Button>}>
          <Link to={"/users/" + props.decoded._id}>
            <materialize.Icon>account_circle</materialize.Icon>Profile
          </Link>
          <materialize.Divider />
          <Link to={"/myPosts/" + props.decoded._id}>
            <materialize.Icon>insert_photo</materialize.Icon>
            My Posts
          </Link>
          <materialize.Divider />
          <Link to="/" onClick={logOut}>
            <materialize.Icon>settings_power</materialize.Icon>
          </Link>
        </materialize.Dropdown>
      </materialize.Navbar>
    </div>

    //si no hay token muestrame estas cosas si no muestrame otras
    // para darle opciones a mi dropdown : options={{hover:true}}

    // <div className="container-fluid">
    //   <nav className="nav-extended">
    //     <div className="nav-wrapper">
    //       <Link to="/">
    //         <div className="brand-logo">
    //           <img className="responsive-img object" width="70"src="/image/objetivo.png" alt=""/>
    //         </div>
    //       </Link>
    //       <a href="#" data-target="mobile-nav" className="sidenav-trigger">
    //         <i className="material-icons">menu</i>
    //       </a>

    //       <ul className="right hide-on-med-and-down list">
    //         <li>
    //           <Link to="/users">Users</Link>
    //         </li>
    //         <li>
    //           <Link to="/posts">Posts</Link>
    //         </li>
    //         <li>
    //           <Link to="/events">Events</Link>
    //         </li>
    //         <li>
    //           <img
    //             width="60"
    //             className="responsive-img avatar"
    //             src={
    //               user.avatar
    //                 ? "http://localhost:8080/uploads/avatars/" +
    //                   user.avatar +
    //                   "?" +
    //                   Date()
    //                 : "/image/default-avatar1.jpg"
    //             }
    //             alt="avatar"
    //           />
    //         </li>

    //         <Dropdown id="dropdown2"
    //           trigger={
    //             <Button id="btnDrop">
    //               {user.username}
    //               <Icon className="material-icons i">arrow_drop_down</Icon>
    //             </Button>
    //           }
    //         >
    //           <Link to={"/users/" + props.decoded._id}>
    //             <Icon>account_circle</Icon>Profile
    //           </Link>

    //           <Divider />

    //           <Link to={"/myPosts/" + props.decoded._id}>
    //             <Icon>insert_photo</Icon>
    //             My Posts
    //           </Link>
    //           <Divider />

    //           <Link
    //           to="/"
    //           onClick={logOut}
    //         ><Icon>settings_power</Icon>

    //         </Link>

    //         </Dropdown>

    //       </ul>
    //     </div>
    //   </nav>
    //   <ul className="sidenav" id="mobile-nav">
    //     <li>
    //       <Link to="/users">Users</Link>
    //     </li>
    //     <li>
    //       <Link to="/posts">Posts</Link>
    //     </li>
    //     <li>
    //       <Link to="/events">Events</Link>
    //     </li>
    //   </ul>
    // </div>

    /*
 <div className="container-fluid">

<nav>
  <div className="nav-wrapper">
    <img
      width="60"
      src={
        user.avatar
          ? "http://localhost:8080/uploads/avatars/" +
            user.avatar +
            "?" +
            Date()
          : "/image/foto-default.png"
      }
      alt="avatar"
    />
    <ul className="right hide-on-med-and-down">
      <li>
        <Link to={"/users/" + props.decoded._id}>My profile</Link>
      </li>
      {!props.decoded.admin && (
        <li>
          <Link to={"/myPosts/" + props.decoded._id}>My posts</Link>
        </li>
      )}
      <li>
        <Link to="/">Home</Link>
      </li>
        <li>
          <Link to="/users">
            Users
          </Link>
        </li>
      
      <li>
        <Link to="/posts">
          
          Posts
        </Link>
      </li>
      <li>
        <Link to="/events">Events</Link>
      </li>
      <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>{user.username}</a>
      <ul id='dropdown1' className='dropdown-content'>
    <li><a href="#">one</a></li>
    <li><a href="#">two</a></li>
  </ul>

      <Link
        to="/"
        className="waves-effect waves-light btn-small"
        onClick={logOut}
      >
        <i className="small material-icons">settings_power</i>
      </Link>
    </ul>
  </div>
</nav>
</div> 
*/
  );
};
const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  decoded: state.decoded,
  users: state.users
});

const mapDispatchToProps = {
  Reset: actions.Reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
