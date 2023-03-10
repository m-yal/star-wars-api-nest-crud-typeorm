import { applyDecorators, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "../../../common/interceptors/executed-response.interceptor";
import { ApplyDecorators } from "../../../common/types/types";
import { LocalAuthGuard } from "../guards/local.auth.guard";
import { RegisteredInterceptor } from "../interceptors/registered.interceptor";
import { LoginBodyValidationPipe } from "../login.body.validation.pipe";

export function LoginDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiBody({
                schema: {
                    default: {
                        username: "admin123",
                        password: "123123"
                    }
                }
        }),
        UseGuards(LocalAuthGuard),
        ApiOperation({ summary: 'Login' }),
        UseInterceptors(
            ExecutedResponseInterseptor,
        ),
        UsePipes(new ValidationPipe()),
    )
}
export function LogoutDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiOperation({ summary: 'Logout, by destroying all session cookies' }),
        UseInterceptors(
            ExecutedResponseInterseptor,
        )
    )
}
export function RegisterDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiBody({
            schema: {
                default: {
                    username: "some_username",
                    password: "secret_password"
                }
            }
        }),
        ApiOperation({ summary: 'Register new user' }),
        UseInterceptors(
            RegisteredInterceptor,
        ),
        UsePipes(new ValidationPipe()),
    )
}