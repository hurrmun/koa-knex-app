import Koa from 'koa';

export const createUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
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

export const loginUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
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
