import { People } from "../entities/people.entity"

export class LastCreatedPeopleDto {
    data: People[]
    hasNext: boolean
    hasPrev: boolean
}