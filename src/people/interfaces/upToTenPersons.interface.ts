import { Person } from "./person.interface";

export interface UpToTenPersons {
    hasPrevPage: boolean,
    hasNextPage: boolean,
    people: Person[]
}