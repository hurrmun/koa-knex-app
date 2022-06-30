import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaCors from 'koa-cors';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import { config } from './config';

//* Import Routes
import healthcheckRoutes from './routes/healthcheck';
import testRoutes from './routes/test';

//* Config
const app = new Koa();
const PORT = config.port;

//* Middleware
app.use(bodyParser());
app.use(
  koaCors({
    origin: '*',
  })
);
app.use(koaLogger());

//* Router Middleware
const apiRoutes = new Router({ prefix: '/api' });

apiRoutes.use(healthcheckRoutes.routes()); //? '/healthcheck/...'
apiRoutes.use(testRoutes.routes()); //? '/test/...'

app.use(apiRoutes.routes());

//* Listener
const server = app
  .listen(PORT, async () => {
    console.log(`server is listening on :${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
