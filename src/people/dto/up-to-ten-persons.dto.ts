import { Person } from "../interfaces/person.interface";
import { UpToTenPersons } from "../interfaces/upToTenPersons.interface";

export class UpToTenPersonsDto implements UpToTenPersons {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    people: Person[];
}