import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

app.model(require('./models/users'));
app.model(require('./models/schedulers'));
app.model(require('./models/queryrules'));
app.model(require('./models/dashboard'));
app.model(require('./models/servers'));

app.use(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
