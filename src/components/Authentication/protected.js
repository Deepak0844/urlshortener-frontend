import { Route, Redirect } from "react-router-dom";

//protected router does not allows to some page when the user does not sign in
export default function ProtectedRouter({ component, ...rest }) {
  const RenderComponents = component;
  const hasToken = localStorage.getItem("token");
  console.log(hasToken);
  return (
    <Route
      {...rest}
      render={(props) => {
        return hasToken !== null ? (
          <RenderComponents {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        );
      }}
    />
  );
}
