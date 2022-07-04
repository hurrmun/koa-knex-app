import Koa from 'koa';
// import bcrypt from 'bcrypt';
import { dbCreateUser } from '../services/dbaccess';

export const createUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    //* Validate the request body

    dbCreateUser(ctx.request.body);
    // console.log('request body', ctx.request.body);
    ctx.body = {
      message: 'hello',
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
