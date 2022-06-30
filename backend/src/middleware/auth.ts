import Koa from 'koa';

export default {
  protect: async (ctx: Koa.DefaultContext, next: Koa.Next) => {
    try {
      console.log('auth activated');
    } catch (error) {
      console.error(error);
    }
  },
};
