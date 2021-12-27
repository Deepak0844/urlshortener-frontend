import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

//routes
import DashboardLayout from "./components/DashboardLayout.js";
import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "./components/loader";

const SigninForm = React.lazy(() =>
  import("./components/Authentication/SigninForm")
);
const SignUpForm = React.lazy(() =>
  import("./components/Authentication/SignUpForm")
);
const ForgetPassword = React.lazy(() =>
  import("./components/Authentication/forgetpassword")
);

export function App() {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
      />
      <Router>
        <Suspense fallback={Loader}>
          <Switch>
            <Route
              exact
              path="/signin"
              name="signin Page"
              render={(props) => <SigninForm {...props} />}
            />
            <Route
              exact
              path="/signup"
              name="signup Page"
              render={(props) => <SignUpForm {...props} />}
            />
            <Route
              exact
              path="/forget-password"
              name="forgetpassword Page"
              render={(props) => <ForgetPassword {...props} />}
            />
            <Route
              path="/"
              name="dashboard"
              render={(props) => <DashboardLayout {...props} />}
            />
          </Switch>
        </Suspense>
      </Router>
      {/* <DashboardLayout /> */}
    </React.Fragment>
  );
}
