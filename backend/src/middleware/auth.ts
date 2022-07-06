import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { config as dotenv } from 'dotenv';
dotenv();

const privateKey = process.env.JWT_ACCESS_SECRET as string;

export default {
  authenticateToken: async (ctx: Koa.DefaultContext, next: Koa.Next) => {
    try {
      const authHeader = ctx.request.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) return ctx.throw(401, 'token not found');

      jwt.verify(token, privateKey, (err: any, user: any) => {
        if (err) return ctx.throw(403, 'token is not valid', { token: token });
        ctx.user = user;
        next();
      });
    } catch (error) {
      console.error(error);
    }
  },

  getToken: async (userId: string, email: string, username: string) => {
    const payload = { user_id: userId, email: email, username: username };
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: 'HS256',
      noTimestamp: true,
    });

    return accessToken;
  },
};
