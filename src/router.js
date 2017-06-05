import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from './routes/Users.js';
import Servers from './routes/Servers.js';
import Queryrules from './routes/Queryrules.js';
import Schedulers from './routes/Schedulers.js';
import Dashboard from './routes/Dashboard.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={Users} />
      <Route path="/servers" component={Servers} />
      <Route path="/queryrules" component={Queryrules} />
      <Route path="/schedulers" component={Schedulers} />
    </Router>
  );
}

export default RouterConfig;
