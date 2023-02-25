import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesService } from "./../../files/files.service";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { SPECIES_RELATIONS_FIELDS } from "../config/relations.fields";
import { Species } from "./species.entity";
import { Files } from "../../files/file.entity";

@Injectable({})
export class SpeciesService extends SwapiAbstractService<Species> {

    readonly relationFields: string[] = SPECIES_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Species) speciesRepository: Repository<Species>, 
        @Inject("IFilesActions") filesService: FilesService,
        @Inject("FilesRecordsRepository") filesRecordsRepository: Repository<Files>,
        ) {
        super(speciesRepository, filesService, filesRecordsRepository);
    }
}