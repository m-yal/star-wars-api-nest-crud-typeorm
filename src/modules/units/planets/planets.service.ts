import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { PLANETS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Planet } from "./planets.entity";
import { File } from "../../files/file.entity";
import { FilesInjectionToken } from "../../files/injection.tokens";

@Injectable({})
export class PlanetsService extends SwapiAbstractService<Planet> {

    readonly relationFields: string[] = PLANETS_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Planet) planetsRepository: Repository<Planet>, 
        @Inject(FilesInjectionToken.FILES_ACTIONS) filesService: FilesService,
        @InjectRepository(File) filesRecordsRepository: Repository<File>,
    ) {
        super(planetsRepository, filesService, filesRecordsRepository);
    }
}