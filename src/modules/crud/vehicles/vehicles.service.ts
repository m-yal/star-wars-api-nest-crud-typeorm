import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilesService } from "./../../files/files.service";
import { Repository } from "typeorm";
import { SwapiAbstractService } from "../abstract.service";
import { VEHICLES_RELATIONS_FIELDS } from "../config/relations.fields";
import { Vehicles } from "./vehicles.entity";
import { Files } from "../../files/file.entity";

@Injectable({})
export class VehiclesService extends SwapiAbstractService<Vehicles> {

    readonly relationFields: string[] = VEHICLES_RELATIONS_FIELDS;

    constructor(
        @InjectRepository(Vehicles) vehiclesRepository: Repository<Vehicles>,
        @Inject("IFilesActions") filesService: FilesService,
        @Inject("FilesRecordsRepository") filesRecordsRepository: Repository<Files>,
    ) {
        super(vehiclesRepository, filesService, filesRecordsRepository);
    }
}