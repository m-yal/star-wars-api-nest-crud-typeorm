/* Super inteface of unit entity */
export interface IUnitEntity { }

export interface IUniversalEntityUnitData extends IUnitEntity {
    id?: number;
    name?: string;
    created?: Date;
    edited?: Date;
    url?: string;
}