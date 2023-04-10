import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilesService } from "../../files/files.service";
import { SwapiAbstractService } from "../abstract.service";
import { VEHICLES_RELATIONS_FIELDS } from "../config/relations.fields";
import { Vehicle } from "./vehicles.entity";
import { File } from "../../files/file.entity";
import { FilesInjectionToken } from "../../files/injection.tokens";

@Injectable({})
export class VehiclesService extends SwapiAbstractService<Vehicle> {

    readonly relationFields: string[] = VEHICLES_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Vehicle) vehiclesRepository: Repository<Vehicle>,
        @Inject(FilesInjectionToken.FILES_ACTIONS) filesService: FilesService,
        @InjectRepository(File) filesRecordsRepository: Repository<File>,
    ) {
        super(vehiclesRepository, filesService, filesRecordsRepository);
    }
}