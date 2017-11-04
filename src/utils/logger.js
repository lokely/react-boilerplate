export const logger = () => async (ctx, next) => {
  await next();
  console.log(`${ctx.status} ${ctx.method} ${ctx.url}`);
};
