import Koa from 'koa';

export const checkAuth = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    await next();
    ctx.body = {
      status: 'success',
      data: 'is protected',
    };
  } catch (error) {
    console.error(error);
  }
};
