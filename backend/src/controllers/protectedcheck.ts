import Koa from 'koa';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';

export const checkAuth = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    //* Authenticate User with auth middleware
    await next();

    //* if no token/user exit
    if (!ctx.user) {
      return;
    }

    ctx.body = { user: ctx.user };
  } catch (error) {
    console.error(error);
  }
};
