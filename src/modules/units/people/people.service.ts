import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { PEOPLE_RELATIONS_FIELDS } from "../config/relations.fields";
import { Person } from "./people.entity";
import { File } from "../../files/file.entity";
import { FilesInjectionToken } from "../../files/injection.tokens";

@Injectable({})
export class PeopleService extends SwapiAbstractService<Person> {

    readonly relationFields: string[] = PEOPLE_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Person) peopleRepository: Repository<Person>, 
        @Inject(FilesInjectionToken.FILES_ACTIONS) filesService: FilesService,
        @InjectRepository(File) filesRecordsRepository: Repository<File>,
    ) {
        super(peopleRepository, filesService, filesRecordsRepository);
    }
}