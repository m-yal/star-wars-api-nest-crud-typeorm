import { DocumentBuilder } from "@nestjs/swagger";

export class SwapiSwaggerDocumentBuilder {
    public static run() {
        return new DocumentBuilder()
        .setTitle("Swagger swapi")
        .setDescription("Swapi server UI made with help of Swagger")
        .setVersion(`1`)
        .build();
    }
}