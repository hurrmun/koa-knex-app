import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { config as dotenv } from 'dotenv';
dotenv();

const privateKey = process.env.JWT_ACCESS_SECRET as string;

export default {
  protect: async (ctx: Koa.DefaultContext, next: Koa.Next) => {
    try {
      console.log('auth activated');
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
