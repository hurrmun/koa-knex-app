import Koa from 'koa';
import bcrypt from 'bcrypt';
import {
  dbCreateUser,
  dbCheckUserByEmail,
  dbCheckUserByUsername,
} from '../services/dbaccess';
import { UserAccount } from '../utils/validation';
import { validate } from 'class-validator';
import { generateAccessToken, generateRefreshToken } from '../middleware/auth';

//! Do not do this in production! Use smt like Redis Cache or DB
let refreshTokens: any[] = [];

export const token = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const refreshToken = ctx.request.body.token;
  if (refreshToken === null) {
    ctx.body = {
      message: 'no refresh token given',
    };
    return ctx.throw(401, 'no refresh token given');
  }
  if (!refreshTokens.includes(refreshToken)) {
    ctx.body = {
      message: 'refresh token not found',
    };
    return ctx.throw(403, 'refresh token not found');
  }
  //* Verify Refresh Token
  next();
};

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
    const accessToken = await generateAccessToken(registeredUser);
    const refreshToken = await generateRefreshToken(registeredUser);
    refreshTokens.push(refreshToken);

    //* return body
    ctx.body = {
      user: {
        user_id: registeredUser.id,
        email: registeredUser.email,
        username: registeredUser.username,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
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
    const accessToken = await generateAccessToken(userByEmail);
    const refreshToken = await generateRefreshToken(userByEmail);
    refreshTokens.push(refreshToken);

    ctx.body = {
      user: {
        user_id: userByEmail.id,
        email: userByEmail.email,
        username: userByEmail.username,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    //! Do not do this in production! Use smt like Redis Cache or DB
    refreshTokens = refreshTokens.filter(
      (token) => token !== ctx.request.body.token
    );
    ctx.status = 204;
  } catch (error) {
    console.error(error);
  }
};
