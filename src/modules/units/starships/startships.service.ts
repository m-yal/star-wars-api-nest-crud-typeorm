import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { STARSHIPS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Starship } from "./starships.entity";
import { File } from "../../files/file.entity";
import { FilesInjectionToken } from "../../files/injection.tokens";

@Injectable({})
export class StarshipsService extends SwapiAbstractService<Starship> {

    readonly relationFields: string[] = STARSHIPS_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Starship) starshipsRepository: Repository<Starship>,
        @Inject(FilesInjectionToken.FILES_ACTIONS) filesService: FilesService,
        @InjectRepository(File) filesRecordsRepository: Repository<File>,
        ) {
        super(starshipsRepository, filesService, filesRecordsRepository);
    }
}