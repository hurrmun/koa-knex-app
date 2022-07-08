import Router from 'koa-router';
import { createUser, loginUser, logoutUser, token } from '../controllers/users';
import { authenticateToken, verifyRefreshToken } from '../middleware/auth';

const router = new Router({
  prefix: '/user',
});

router.post('/register', createUser);
router.post('/login', loginUser, authenticateToken);
router.delete('/logout', logoutUser);
router.post('/token', token, verifyRefreshToken);

export default router;
