import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { STARSHIPS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Starships } from "./starships.entity";

@Injectable({})
export class StarshipsService extends SwapiAbstractService<Starships> {

    readonly relationFields: string[] = STARSHIPS_RELATIONS_FIELDS;

    constructor(@InjectRepository(Starships) starshipsRepository: Repository<Starships>) {
        super(starshipsRepository);
    }
}