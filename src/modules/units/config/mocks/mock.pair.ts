import { BaseEntity } from "../base-entity";
import { CreateUnitDto } from "../dto/ create.unit.dto";

export class MocksPair<E extends BaseEntity, D extends CreateUnitDto> {
    private mockUnits: E[];
    private mockDtos: D[];

    constructor(mockUnits: E[], mockDtos: D[]) {
        this.mockUnits = mockUnits;
        this.mockDtos = mockDtos;
    }

    getMockUnits(): E[] {
        return this.mockUnits;
    }

    getMockDtos(): D[] {
        return this.mockDtos;
    }
}