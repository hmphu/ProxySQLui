import dva from 'dva';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import './index.css';
import createLoading from 'dva-loading';

const ERROR_MSG_DURATION = 3;
// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
      message.error(e.message, ERROR_MSG_DURATION);
    },
});

app.model(require('./models/users'));
app.model(require('./models/schedulers'));
app.model(require('./models/queryrules'));
app.model(require('./models/dashboard'));
app.model(require('./models/servers'));
app.model(require('./models/variables'));

app.use(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
