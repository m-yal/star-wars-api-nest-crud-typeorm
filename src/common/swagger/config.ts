import { DocumentBuilder } from "@nestjs/swagger";
import { env } from "process";

export class SwapiSwaggerDocumentBuilder {
    public static run() {
        return new DocumentBuilder()
        .setTitle(env.SWAGGER_MAIN_DOC_TITLE)
        .setDescription(env.SWAGGER_MAIN_DOC_DESCRIPTION)
        .setVersion(env.SWAGGER_VERSION)
        .build();
    }
}