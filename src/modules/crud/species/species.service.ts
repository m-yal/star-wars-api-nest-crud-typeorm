import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { SPECIES_RELATIONS_FIELDS } from "../config/relations.fields";
import { Species } from "./species.entity";

@Injectable({})
export class SpeciesService extends SwapiAbstractService<Species> {

    readonly relationFields: string[] = SPECIES_RELATIONS_FIELDS;

    constructor(@InjectRepository(Species) speciesRepository: Repository<Species>) {
        super(speciesRepository);
    }
}