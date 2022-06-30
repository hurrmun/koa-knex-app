import Koa from 'koa';

export const pingHealth = async (ctx: Koa.DefaultContext) => {
  try {
    ctx.body = {
      status: 'success',
      data: 'pong',
    };
  } catch (error) {
    console.error(error);
  }
};
