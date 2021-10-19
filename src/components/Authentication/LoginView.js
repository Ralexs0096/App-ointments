import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin } from "../../actions/auth";

const LoginView = () => {

  const dispatch = useDispatch()

  const [ formValues, handleLoginInputChange ] = useForm({
    Email: '',
    Password: ''
  });

  const {Email, Password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(Email, Password))
  }

  return (
    <>
      <h1 className="text-center font-main display-4 text-main">
        App-oitments
      </h1>
      <div className="container login-container ">
        <div className="row">
          <div className="col-md-6 offset-md-3 login-form-1 bg-white">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="Email"
                  value={Email}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="Password"
                  value={Password}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit btn btn-block"
                  value="Login"
                />
              </div>
              <div className="form-group">
                <Link to="/register" value="Login">
                  Crear una cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
