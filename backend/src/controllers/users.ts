import Koa from 'koa';
import bcrypt from 'bcrypt';
import {
  dbCreateUser,
  dbCheckUserByEmail,
  dbCheckUserByUsername,
} from '../services/dbaccess';
import { UserAccount } from '../utils/validation';
import { validate } from 'class-validator';
import auth from '../middleware/auth';

export const createUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    let newUser = new UserAccount();
    newUser.email = ctx.request.body.email;
    newUser.username = ctx.request.body.username;
    newUser.password = ctx.request.body.password;

    //* Validate the request body
    const validationOptions = {};
    const errors = await validate(newUser, validationOptions);
    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        data: errors,
      };
      return ctx;
    }

    //* Check id existing user already exists
    const userByEmail = await dbCheckUserByEmail(newUser.email);
    const userByUsername = await dbCheckUserByUsername(newUser.username);

    if (newUser.username === userByUsername?.username) {
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
    await dbCreateUser(ctx.request.body);

    const registeredUser = await dbCheckUserByEmail(newUser.email);

    //* Create token
    const accessToken = await auth.getToken(
      registeredUser.id,
      registeredUser.email,
      registeredUser.username
    );

    //* return body
    ctx.body = { token: accessToken };
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    //* check if email exists in db
    const userByEmail = await dbCheckUserByEmail(ctx.request.body.email);
    if (!userByEmail) {
      ctx.body = {
        message: 'account does not exist',
      };
      return ctx.throw(400, 'account does not exist');
    }

    //* check if password is matching
    const isPasswordMatching = await bcrypt.compare(
      ctx.request.body.password,
      userByEmail.password
    );

    if (!isPasswordMatching) {
      ctx.body = {
        message: 'incorrect password',
      };
      return ctx.throw(400, 'incorrect password');
    }

    //* create token for login
    const accessToken = await auth.getToken(
      userByEmail.id,
      userByEmail.email,
      userByEmail.username
    );

    ctx.body = {
      user: {
        id: userByEmail.id,
        email: userByEmail.email,
        username: userByEmail.username,
      },
      token: accessToken,
    };
  } catch (error) {
    console.error(error);
  }
};
