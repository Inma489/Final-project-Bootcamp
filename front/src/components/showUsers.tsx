import React from "react";
import { IUser, IDecoded } from "../interfaces";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers";
import * as actions from "../actions";
import { Link, RouteComponentProps } from "react-router-dom";

interface IPropsGlobal {
  token: string;
  decoded: IDecoded;
  users: IUser[];
  removeUser: (user_id: string) => void;
  removePhoto: (photo_id: string) => void;
}

const ShowUsers: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  // hacemos la peticion para eliminar un usuario de la base de daatos
  const Delete = (id: string) => {
    fetch("http://localhost:8080/api/users/" + id, {
      method: "DELETE",
      headers: {
        //   "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(() => {
      props.removeUser(id);
      props.removePhoto(id);

      // props.history.push("/users"); // me redirije a mi pagina de users// el history.push es para que me redirija al /users
    });
  };

  // const ICanSee =
  //  props.decoded.admin || props.decoded._id === props.match.params.userId;

  return (
    <div className="section container">
      <div className="row">
        {props.users
          .filter(u => u._id != props.decoded._id)
          .map(u => (
            <div className="col s2" key={u.username}>
              <Link to={"/users/" + u._id + "/userDetail"}>
                <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img
                      width="60"
                      src={
                        u.avatar
                          ? "http://localhost:8080/uploads/avatars/" + u.avatar
                          : "/image/avatar-default.png"
                      }
                      alt="user"
                    />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                      {u.username}
                    </span>

                    {props.decoded.admin && (
                      <Link
                        to={"/users/" + u._id + "/edit"}
                        className="waves-effect waves-light btn ml-4"
                      >
                        Edit
                      </Link>
                    )}
                    {props.decoded.admin && (
                      <Link
                        onClick={() => {
                          Delete(u._id);
                        }}
                        to="/users/"
                        className="waves-effect waves-light btn"
                      >
                        Delete
                      </Link>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  users: state.users,
  decoded: state.decoded
});

const mapDispatchToProps = {
  removeUser: actions.removeUser,
  removePhoto: actions.removePhoto
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowUsers);
