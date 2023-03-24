import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesService } from "./../../files/files.service";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { PEOPLE_RELATIONS_FIELDS } from "../config/relations.fields";
import { People } from "./people.entity";
import { Files } from "../../files/entities/file.entity";

@Injectable({})
export class PeopleService extends SwapiAbstractService<People> {

    readonly relationFields: string[] = PEOPLE_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(People) peopleRepository: Repository<People>, 
        @Inject("IFilesActions") filesService: FilesService,
        @Inject("FilesRecordsRepository") filesRecordsRepository: Repository<Files>,
    ) {
        super(peopleRepository, filesService, filesRecordsRepository);
    }
}