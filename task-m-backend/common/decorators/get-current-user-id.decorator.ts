import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/auth/strategies";

export const GetCurrentUserId = createParamDecorator((data: undefined ,context:ExecutionContext):number=>{
    const request = context.switchToHttp().getRequest()
    const user = request.user as JwtPayload;
    return user.sub
})