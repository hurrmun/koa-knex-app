import Koa from 'koa';

export const pingHealth = async (
  ctx: Koa.DefaultContext,
  next: Koa.Middleware
) => {
  try {
    ctx.body = {
      status: 'success',
      data: 'pong',
    };
  } catch (error) {
    console.error(error);
  }
};
