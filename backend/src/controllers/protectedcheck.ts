import Koa from 'koa';
import jwt from 'jsonwebtoken';

export const checkAuth = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    //* Authenticate User with auth middleware
    await next();
    // ctx.body = {
    //   status: 'success',
    //   data: 'is protected',
    // };
    const username = ctx.req.username;
    const user = { name: username };
  } catch (error) {
    console.error(error);
  }
};
