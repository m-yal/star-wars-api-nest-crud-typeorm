import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { VERSION_HEADER, CURRENT_VERSION } from "./common/versioning/options";

@ApiTags("Hello world healthcheck path")
@ApiHeader({ name: VERSION_HEADER, schema: { default: CURRENT_VERSION } })
@Controller("/")
export class AppController {
  @Get()
  helloWorld(): string {
    return 'Hello world!';
  }
}