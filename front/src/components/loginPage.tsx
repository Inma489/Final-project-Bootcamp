import React, { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
// import imgs from '../../public/image/foto.jpg'
import { RouteComponentProps } from "react-router";
import "../css/loginPage.css";
import { IDecoded, IUser } from "../interfaces";
import * as actions from "../actions";
import { IGlobalState } from "../reducers";
import { connect } from "react-redux";

const { Carousel } = require("react-materialize");
const { Modal, Button } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  decoded: IDecoded;
  setToken: (token: string) => void;
  setDecoded: (decoded: IDecoded) => void;
  addUser: (user: IUser) => void;
}

const LoginPage: React.FC<IPropsGlobal & RouteComponentProps<any>> = props => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState();
  const inputFileRef = React.createRef<any>();
  const [error, setError] = React.useState("");
  // const [updated, setUpdated] = React.useState(false);
  // const inputFileRef = React.createRef<any>();
  const handleFileUpload = (event: any) => setFile(event.target.files[0]);
  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFile(event.target.files![0]);

  const updateUsername = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  // para mandar la foto en el formulario de registrar a un usuario

  // para que se loguee el usuario y acceda a su pagina
  const getToken = () => {
    fetch("http://localhost:8080/api/auth", {
      // es una funcion promesa, funcion que se ejecuta que puede esperar hasta que se obtenga la respuesta, devuelve una respuesta
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }) // aqui pongo el username declarado arriba y el password
    }).then(res => {
      if (res.ok) {
        res.text().then(token => {
          // nos pinta el token que llamamos del servidor, y me la imrpime en el html
          console.log(token);
          localStorage.setItem("token", token); // para que guarde la sesion en el session storage

          props.setToken(token); // props settoken viene de redux
          // aqui hare la constante decoded para ver lo que trae mi decode y poder verlo en la consola
          const decoded = jwt.decode(token);
          console.log(decoded); // aqui me muestra lo que trae el decode en consola
          // aqui le decimos que si el decoded es disitinto de null o el tipo de decoded es distinto de un string que me lo descodifique
          if (decoded !== null && typeof decoded !== "string") {
            props.setDecoded(decoded); // la decodificacion tambien viene de redux
          }

          props.history.push("/");
        });
      }
    });
  };
  // registro de usuarios
  // para mandar la foto en el formulario de registrar a un usuario
  const addUser = () => {
    const data = new FormData();
    if (file) {
      data.append("file", file);
    } else {
      data.append("file", "");
    }
    data.append("_id", "");
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    fetch("http://localhost:8080/api/users/add", {
      method: "POST",
      body: data
    })
      .then(res => {
        if (res.ok) {
          // poner siempre porque es el usuario nuevo que voy a crear
          res.json().then(u => {
            props.addUser(u);
            const a: any = document.getElementsByClassName("modal-overlay")[0];
            a.click();
            document.getElementById("btnLogin")!.click();

            // me refresca la pagina que le estoy diciendo
            //aqui me  gustaria poner que cuando el usuario se haya registrado correctamente
            // que le saliera un texto que le pusiera: usuario resgistrado o algo asi
          });
        } else {
          //   res.send("error");

          console.log("el username ya existe");
          setError("El username ya está ocupado");
        }
      })
      .catch(err => {
        // res.status(400).send("error add ," + err);
        console.log("error al add user," + err);
      });
  };

  return (
    <div className="container">
      {/* <Carousel
        images={[
          "https://picsum.photos/200/300?image=0",
          "https://picsum.photos/200/300?image=1",
          "https://picsum.photos/200/300?image=2"
        ]}
      /> */}

      <div className="modal-content center">
        <Button id="btnLogin" href="#modal1" className="modal-trigger">
          Login
        </Button>
        <Modal id="modal1" header="Login Account">
          <div className="section center">
            <div className="row">
              <div className="col s12">
                <img src="/image/foto.jpg" alt="foto" />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="input-field">
                  <i className="material-icons prefix">email</i>
                  <input type="text" value={email} onChange={updateEmail} />
                  <label>Email</label>
                </div>
                <br />
                <div className="row">
                  <div className="col s12">
                    <div className="input-field">
                      <i className="material-icons prefix">lock</i>
                      <input
                        type="password"
                        value={password}
                        onChange={updatePassword}
                        id="password"
                      />
                      <label>Password</label>
                    </div>
                  </div>
                </div>
                <br />

                <input
                  type="submit"
                  value="SignIn"
                  onClick={getToken}
                  className="btn btn-large submit"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="modal-content center">
        <Button href="#modal2" className="modal-trigger">
          SignUp
        </Button>
        <Modal id="modal2" header="Welcome to Do We Zoom">
          <img src="/image/foto-default.png" alt="avatar" />
          <div className="input-field">
            <input
              ref={inputFileRef}
              hidden
              type="file"
              onChange={handleFileUpload}
              accept=".jpg"
            />
            <br />
            <input
              type="button"
              value="Add your photo"
              className="waves-effect waves-light btn"
              onClick={() => inputFileRef.current.click()}
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">person</i>
            <input type="text" value={username} onChange={updateUsername} />
            <label>Username</label>
            <div>{error}</div>
          </div>
          <br />
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input type="text" value={email} onChange={updateEmail} />
            <label>Email</label>
          </div>
          <br />
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input type="password" value={password} onChange={updatePassword} />
            <label>Password</label>
          </div>
          <br />
          <input
            type="submit"
            value="Send"
            onClick={addUser}
            className="btn btn-large submit"
          />
          
        </Modal>
      </div>
    </div>
  );
};
const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  decoded: state.decoded
});
const mapDispatchToProps = {
  setToken: actions.setToken,
  setDecoded: actions.setDecoded,
  addUser: actions.addUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
