import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      // console.log(`\n\n\n\nsearching for: ${data} in \n${request.user}`)

      const value = request.user[data];
      if (!value) {
        throw new NotFoundException(`Paramaeter "${data}" not found`)
      }

      return value;
    }
    return request.user;
  },
);
