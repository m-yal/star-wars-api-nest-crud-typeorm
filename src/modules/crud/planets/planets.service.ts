import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesService } from "src/modules/files/files.service";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { PLANETS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Planets } from "./planets.entity";

@Injectable({})
export class PlanetsService extends SwapiAbstractService<Planets> {

    readonly relationFields: string[] = PLANETS_RELATIONS_FIELDS;

    constructor(@InjectRepository(Planets) planetsRepository: Repository<Planets>, @Inject("IFilesActions") filesService: FilesService) {
        super(planetsRepository, filesService);
    }
}