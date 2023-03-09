import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesService } from "./../../files/files.service";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { FILMS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Films } from "./films.entity";
import { Files } from "../../files/file.entity";

@Injectable({})
export class FilmsService extends SwapiAbstractService<Films> {

    readonly relationFields: string[] = FILMS_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Films) filmsRepository: Repository<Films>, 
        @Inject("IFilesActions") filesService: FilesService,
        @InjectRepository(Files) filesRecordsRepository: Repository<Files>,
    ) {
        super(filmsRepository, filesService, filesRecordsRepository);
    }
}