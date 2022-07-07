import Router from 'koa-router';
import { checkAuth } from '../controllers/protectedcheck';
import { authenticateToken } from '../middleware/auth';

const router = new Router({
  prefix: '/protected',
});

router.get('/test', checkAuth, authenticateToken);

export default router;
