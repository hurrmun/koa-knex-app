import Router from 'koa-router';
import { pingHealth } from '../controllers/healthcheck';

const router = new Router({
  prefix: '/healthcheck',
});

router.get('/ping', pingHealth);

export default router;
