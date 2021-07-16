import React, { useState, useEffect } from "react";
import "./Login.css";
import LoginService from "../Service/LoginService";

import { Redirect } from "react-router-dom";

const Login = () => {

  var [authLogin, setAuthLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (evt) => setEmail(evt.target.value);
  const onPasswordChange = (evt) => setPassword(evt.target.value);

  useEffect(() => {
    const token = localStorage.getItem("uTID");
    if (token !== null) {
      console.log("errortoken", token);
      setAuthLogin(true);
    } 
  }, []);

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (email !== "") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        alert("Please enter valid email address.");
        return;
      }
    }

    LoginService.login(email, password)
      .then((response) => response.json())
      .then((user) => {
        if (user.status !== 401 && user.status === undefined) {
          console.log("error", user);
          localStorage.setItem("uTID", user.authToken);
          localStorage.setItem("ccid", user.id);
          setAuthLogin(true);
        } else {
          console.log("error", user.status);
        }
      })
      .catch((error) => console.log("error", error));
  };
  if (authLogin) {
    return <Redirect to="/SmartContentCreator/dashboard" />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                    onChange={onEmailChange}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={onPasswordChange}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>

                {/* <div className="form-check mb-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember password
                  </label>
                </div> */}

                <div className="d-grid gap-2 col-6 mx-auto m-5">
                  <button
                    onClick={onSubmit}
                    className="btn btn-primary text-uppercase"
                    type="button"
                    disabled={email.length === 0 || password.length === 0}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
