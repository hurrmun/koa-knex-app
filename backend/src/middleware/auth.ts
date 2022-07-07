import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { config as dotenv } from 'dotenv';
import { IFullUserProfile, IUserProfile } from '../types/interface';
dotenv();

const privateKey = process.env.JWT_ACCESS_SECRET as string;
const refreshKey = process.env.JWT_REFRESH_SECRET as string;

export const authenticateToken = async (
  ctx: Koa.DefaultContext,
  next: Koa.Next
) => {
  try {
    const authHeader = ctx.request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      ctx.body = {
        message: 'token not found',
      };
      return ctx.throw(401, 'token not found');
    }

    jwt.verify(token, privateKey, (err: any, user: any) => {
      if (err) {
        ctx.body = {
          message: 'token is not valid',
        };
        return ctx.throw(403, 'token is not valid', { token: token });
      }
      ctx.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
  }
};

export const generateAccessToken = async ({
  id,
  email,
  username,
}: IUserProfile) => {
  const payload = { user_id: id, email: email, username: username };
  const accessToken = jwt.sign(payload, privateKey, {
    //! Usually refresh tokens would be 10 - 30 mins long but 30s here for demo
    expiresIn: '30s',
    algorithm: 'HS256',
    noTimestamp: true,
  });

  return accessToken;
};

export const generateRefreshToken = async ({
  id,
  email,
  username,
}: IUserProfile) => {
  const payload = { user_id: id, email: email, username: username };
  const accessToken = jwt.sign(payload, refreshKey, {
    algorithm: 'HS256',
    noTimestamp: true,
  });

  return accessToken;
};

export const verifyRefreshToken = async (
  ctx: Koa.DefaultContext,
  next: Koa.Next
) => {
  jwt.verify(
    ctx.request.body.token,
    refreshKey,
    async (err: any, user: any) => {
      if (err) {
        ctx.body = {
          errors: err,
        };
        return ctx.throw(403, 'invalid refresh token');
      }
      const accessToken = await generateAccessToken(user);
      ctx.body = {
        accessToken: accessToken,
      };
    }
  );
};
