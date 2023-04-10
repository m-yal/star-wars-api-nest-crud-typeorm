import { BaseEntity } from "../base-entity";
import { CreateUnitDto } from "../dto/ create.unit.dto";
import { MocksPair } from "./mock.pair";

export abstract class RandomMockUnitsGenerator<E extends BaseEntity, D extends CreateUnitDto> {

    abstract generateOneWithRelatedUnits(): E;
    abstract generateOneWithoutRelatedUnits(): E;
    abstract transformSingleUnitToCreateDto(film: E): D;

    generateMocksPair(amount: number): MocksPair<E, D> {
        this.validateInputNumberValue(amount);
        const unitsWithRelations: E[] = this.generateSeveralUnitsWithRelations(amount);
        const dtosWithRelations: D[] = this.transformUnitsToCreateDtos(unitsWithRelations);
        return new MocksPair(unitsWithRelations, dtosWithRelations);
    }
    
    validateInputNumberValue(amount: number): void {
        if (!Number.isInteger(amount) || amount < 0) {
            throw new Error(`Param of generateSeveralUnits method must be integer and above 0`);
        }
    }

    transformUnitsToCreateDtos(unitsWithRelations: E[]): D[] {
        const dtos: D[] = [];
        for (const unit of unitsWithRelations) {
            const dto = this.transformSingleUnitToCreateDto(unit);
            dtos.push(dto); 
        }
        return dtos;
    }

    generateSeveralUnitsWithRelations(amount: number): E[] {
        this.validateInputNumberValue(amount);
        const units: E[] = [];
        for (let i = 0; i < amount; i++) {
            units.push(this.generateOneWithRelatedUnits());         
        }
        return units;
    }

    generateSeveralUnitsWithoutRelations(amount: number): E[] {
        this.validateInputNumberValue(amount);
        const units: E[] = [];
        for (let i = 0; i < amount; i++) {
            units.push(this.generateOneWithoutRelatedUnits());
        }
        return units;
    }
}