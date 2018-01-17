import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Pages from './pages';
import RequireAuth from './components/HOC/RequireAuth';

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Pages.Landing} />
        <Route path="/register" component={Pages.CreateAccount} />
        <Route path="/login" component={Pages.Login} />
        <Route path="/game" component={RequireAuth(Pages.Game)} />
        <Route path="/leaderboard" component={RequireAuth(Pages.Leaderboard)} />
        <Route path="/help" component={RequireAuth(Pages.Help)} />
        <Route component={Pages.NotFound} />
      </Switch>
    </div>
  );
};
