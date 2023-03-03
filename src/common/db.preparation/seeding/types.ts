export type UnitRelationsData = FilmsRelations | PeopleRelations | PlanetsRelations | SpeciesRelations | StarshipsRelations | VehiclesRelations;
export type FilmsRelations = {
    name: string,
    characters: string[],
    planets: string[],
    starships: string[],
    vehicles: string[],
    species: string[],
}
export type PeopleRelations = {
    name: string,
    species: string[],
    vehicles: string[],
    starships: string[],
}
export type PlanetsRelations = {
    name: string,
    residents: string[],
}
export type SpeciesRelations = {
    name: string,
    homeworld: string,
}
export type StarshipsRelations = {
    name: string,
}
export type VehiclesRelations = {
    name: string,
}