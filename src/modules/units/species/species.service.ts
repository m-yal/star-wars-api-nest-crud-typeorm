import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { SPECIES_RELATIONS_FIELDS } from "../config/relations.fields";
import { Specie } from "./species.entity";
import { File } from "../../files/file.entity";
import { FilesInjectionToken } from "../../files/injection.tokens";

@Injectable({})
export class SpeciesService extends SwapiAbstractService<Specie> {

    readonly relationFields: string[] = SPECIES_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Specie) speciesRepository: Repository<Specie>, 
        @Inject(FilesInjectionToken.FILES_ACTIONS) filesService: FilesService,
        @InjectRepository(File) filesRecordsRepository: Repository<File>,
    ) {
        super(speciesRepository, filesService, filesRecordsRepository);
    }
}