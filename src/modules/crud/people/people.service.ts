import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { PEOPLE_RELATIONS_FIELDS } from "../config/relations.fields";
import { People } from "./people.entity";

@Injectable({})
export class PeopleService extends SwapiAbstractService<People> {

    readonly relationFields: string[] = PEOPLE_RELATIONS_FIELDS;

    constructor(@InjectRepository(People) peopleRepository: Repository<People>) {
        super(peopleRepository);
    }
}