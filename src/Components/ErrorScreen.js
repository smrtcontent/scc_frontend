import React, { useState } from "react";
import "../Components/Auth/Login.css";
import { Redirect } from "react-router-dom";
const ErrorScreen = () => {
  var [authLogin, setAuthLogin] = useState(false);

  if (authLogin) {
    return <Redirect to="/SmartContentCreator" />;
  }
  return (
    <div className="container">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <p className="fw-bold text-center fs-1 ">404</p>

            <p class="fs-5 text-center">Page Not Found</p>
            <div className="d-grid gap-2 col-6 mx-auto mb-3">
              <button
                onClick={()=>setAuthLogin(true)}
                className="btn btn-primary text-uppercase"
                type="button"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
