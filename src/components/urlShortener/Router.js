import { URLShortener } from "./URLShortener";
import { Switch, Route, Redirect } from "react-router-dom";
import { SignUpForm } from "../Authentication/SignUpForm";
import { SigninForm } from "../Authentication/SigninForm";
import { PasswordVerify } from "../Authentication/resetPassword";
import { ForgetPassword } from "../Authentication/forgetpassword";
import { ProtectedRouter } from "../Authentication/protected";
import { Activate } from "../Authentication/accountActivation";
import { DataTable } from "./DataTable";
import { Dashboard } from "./Dashboard";
import "./dashboard.css";

export function Router() {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/dashboard"></Redirect>
        </Route>
        <Route exact path="/signup" component={SignUpForm} />
        <Route
          exact
          path="/forgot-password/verify/:token"
          component={PasswordVerify}
        />
        <Route exact path="/signin" component={SigninForm} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/accountverification/:token" component={Activate} />
        <Route exact path="/table" component={DataTable} />
        <ProtectedRouter exact path="/urlshortener" component={URLShortener} />
      </Switch>
    </div>
  );
}
