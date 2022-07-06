import Router from 'koa-router';
import { createUser, loginUser } from '../controllers/users';
import auth from '../middleware/auth';

const router = new Router({
  prefix: '/user',
});

router.post('/register', createUser);
router.post('/login', loginUser, auth.authenticateToken);

export default router;
