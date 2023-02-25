import { faker } from "@faker-js/faker";
import { Films } from "./films.entity";

export class RandomFilmGenerator {
    static generateOneWithoutRelatedUnits() {
        const film = new Films();
        film.name = faker.word.noun();
        film.id = Math.floor(+faker.random.numeric());
        film.created = new Date(faker.date.past());
        film.edited = new Date(faker.date.past());
        film.director = faker.name.fullName();
        film.producer = faker.name.fullName();
        film.characters = [];
        film.episode_id = faker.random.numeric();
        film.images = [];
        film.opening_crawl = faker.random.words(+faker.random.numeric(2));
        film.planets = [];
        film.release_date = new Date(faker.date.past());
        film.species = [];
        film.starships = [];
        film.vehicles = [];
        return film;
    }

    static generateSeveral(amount: number) {
        if (!Number.isInteger(amount)) {
            throw new Error(`Param of generateSeveral method of RandomFilmGenerator must be integer`);
        }
        const films: Films[] = [];
        for (let i = 0; i < amount; i++) {
            films.push(this.generateOneWithoutRelatedUnits());            
        }
        return films;
    }
}