import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Pages from './pages';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Pages.Landing} />
          <Route path="/register" component={Pages.CreateAccount} />
          <Route path="/login" component={Pages.Login} />
          <Route path="/game" component={Pages.Game} />
          <Route path="/leaderboard" component={Pages.Leaderboard} />
          <Route path="/help" component={Pages.Help} />
          <Route component={Pages.NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
