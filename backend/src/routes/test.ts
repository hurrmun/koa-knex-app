import Router from 'koa-router';

const router = new Router({
  prefix: '/test',
});

router.get('/', async (ctx) => {
  try {
    ctx.body = {
      status: 'success',
      data: 'testing',
    };
  } catch (error) {
    console.error(error);
  }
});

export default router;
