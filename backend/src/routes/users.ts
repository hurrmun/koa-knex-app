import Router from 'koa-router';
import { createUser, loginUser } from '../controllers/users';
import auth from '../middleware/auth';

const router = new Router({
  prefix: '/user',
});

router.post('/create', createUser);
router.post('/login', loginUser, auth.protect);

export default router;
