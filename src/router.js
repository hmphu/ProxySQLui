import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from './routes/Users.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/dashboard" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/servers" component={IndexPage} />
      <Route path="/queryrules" component={IndexPage} />
      <Route path="/schedulers" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
