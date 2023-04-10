import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { FILMS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Film } from "./films.entity";
import { File } from "../../files/file.entity";
import { FilesInjectionToken } from "../../files/injection.tokens";

@Injectable({})
export class FilmsService extends SwapiAbstractService<Film> {

    readonly relationFields: string[] = FILMS_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Film) filmsRepository: Repository<Film>, 
        @Inject(FilesInjectionToken.FILES_ACTIONS) filesService: FilesService,
        @InjectRepository(File) filesRecordsRepository: Repository<File>,
    ) {
        super(filmsRepository, filesService, filesRecordsRepository);
    }
}