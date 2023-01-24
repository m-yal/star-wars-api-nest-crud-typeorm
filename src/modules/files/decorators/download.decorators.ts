import { applyDecorators, Header, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiProduces, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ApplyDecorators, UnitTypeEnum } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { RolesGuard } from "src/modules/auth/config/guards/roles.guard";

export function DownloadFileDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiOperation({ summary: "Get one image from one person" }),
    ApiQuery({ name: "imageName", schema: { default: "" } }),
      ApiResponse({
      schema: {
        type: "string",
        format: "binary"
      },
      status: HttpStatus.OK,
      description: "Got an image",
    }),
    ApiProduces('image/*'),
    Header("Content-type", "image/*"),
    Roles(Role.ADMIN, Role.USER),
    // UseGuards(RolesGuard),
  );
}