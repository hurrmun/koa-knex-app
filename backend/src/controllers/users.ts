import Koa from 'koa';
// import bcrypt from 'bcrypt';
import {
  dbCreateUser,
  dbCheckUserByEmail,
  dbCheckUserByUsername,
} from '../services/dbaccess';

export const createUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    //* Validate the request body

    //* Check id existing user already exists
    const userByEmail = await dbCheckUserByEmail(ctx.request.body.email);
    const userByUsername = await dbCheckUserByUsername(
      ctx.request.body.username
    );

    if (ctx.request.body.username === userByUsername?.username) {
      ctx.body = {
        message: 'username already exists',
      };
      return ctx.throw(500, 'username already exists');
    }
    if (ctx.request.body.email === userByEmail?.email) {
      ctx.body = {
        message: 'email already exists',
      };
      return ctx.throw(500, 'email already exists');
    }

    // console.log('request body', ctx.request.body);
    //* Add Account into DB
    dbCreateUser(ctx.request.body);

    //* Create token

    //* return body
    ctx.body = {
      message: 'created',
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
