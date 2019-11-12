import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import ViewUpload from "./containers/ViewUpload";
import Signup from "./containers/Signup";
import Upload from "./containers/upload";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AuthenticatedRoute path="/upload/new" exact component={Upload} appProps={appProps} />
      <AuthenticatedRoute path="/upload/:id" exact component={ViewUpload} appProps={appProps} />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
