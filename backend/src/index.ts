import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import { config } from './config';

//* Import Routes
import healthcheckRoutes from './routes/healthcheck';
import testRoutes from './routes/protectedcheck';
import userRoutes from './routes/users';

//* Config
const app = new Koa();
const PORT = config.port;

//* Router Middleware
const apiRoutes = new Router({ prefix: '/api' });

apiRoutes.use(healthcheckRoutes.routes()); //? '/healthcheck/...'
apiRoutes.use(testRoutes.routes()); //? '/test/...'
apiRoutes.use(userRoutes.routes()); //? '/user/...'

//* Middleware
app
  .use(bodyParser())
  .use(
    cors({
      origin: '*',
    })
  )
  .use(koaLogger())
  .use(apiRoutes.routes())
  .use(apiRoutes.allowedMethods());

//* Listener
const server = app
  .listen(PORT, async () => {
    console.log(
      `server is listening on: ${PORT}. Go to http://localhost:${PORT}`
    );
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
