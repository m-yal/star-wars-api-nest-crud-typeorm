import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { ApplyDecorators } from "src/common/types/types";
import { LocalAuthGuard } from "../config/guards/local.auth.guard";

export function LoginDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiBody({
                schema: {
                    default: {
                        username: "some_username",
                        password: "secret_password"
                    }
                }
        }),
        UseGuards(LocalAuthGuard),
        ApiOperation({ summary: 'Login' }),
    )
}
export function LogoutDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiOperation({ summary: 'Logout, by destroying all session cookies' }),
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
    )
}