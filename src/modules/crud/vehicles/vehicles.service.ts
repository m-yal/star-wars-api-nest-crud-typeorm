import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "./../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { VEHICLES_RELATIONS_FIELDS } from "../config/relations.fields";
import { Vehicles } from "./vehicles.entity";
import { Files } from "../../files/entities/file.entity";

@Injectable({})
export class VehiclesService extends SwapiAbstractService<Vehicles> {

    readonly relationFields: string[] = VEHICLES_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Vehicles) vehiclesRepository: Repository<Vehicles>,
        @Inject("IFilesActions") filesService: FilesService,
        @InjectRepository(Files) filesRecordsRepository: Repository<Files>,
    ) {
        super(vehiclesRepository, filesService, filesRecordsRepository);
    }
}