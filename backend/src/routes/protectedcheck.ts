import Router from 'koa-router';
import { checkAuth } from '../controllers/protectedcheck';
import auth from '../middleware/auth';

const router = new Router({
  prefix: '/protected',
});

router.get('/test', checkAuth, auth.protect);

export default router;
