import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "./../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { STARSHIPS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Starships } from "./starships.entity";
import { Files } from "../../files/entities/file.entity";

@Injectable({})
export class StarshipsService extends SwapiAbstractService<Starships> {

    readonly relationFields: string[] = STARSHIPS_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Starships) starshipsRepository: Repository<Starships>,
        @Inject("IFilesActions") filesService: FilesService,
        @Inject("FilesRecordsRepository") filesRecordsRepository: Repository<Files>,
        ) {
        super(starshipsRepository, filesService, filesRecordsRepository);
    }
}