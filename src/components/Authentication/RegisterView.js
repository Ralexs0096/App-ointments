import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startRegister } from "../../actions/auth";

const RegisterView = () => {

  const dispatch = useDispatch()

  const [ formValues, handleInputChanges ] = useForm({
    Name: '',
    Email: '',
    Password1: '',
    Password2: '',
  });

  const {Name, Email, Password1, Password2} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if(Password1 !== Password2) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Las contraseñas deben ser iguales',
      });
    }
    dispatch(startRegister(Email, Password1, Name))
  }

  return (
    <>
      <h1 className="text-center font-main display-4 text-main">
        App-oitments
      </h1>
      <div className="container login-container ">
        <div className="row">
          <div className="col-md-6 offset-md-3 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="Name"
                  value={Name}
                  onChange={handleInputChanges}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="Email"
                  value={Email}
                  onChange={handleInputChanges}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="Password1"
                  value={Password1}
                  onChange={handleInputChanges}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name="Password2"
                  value={Password2}
                  onChange={handleInputChanges}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit btn btn-block"
                  value="Crear cuenta"
                />
              </div>
              <Link to="/login" className="text-white" value="Login">
                Iniciar Sesion
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterView;
