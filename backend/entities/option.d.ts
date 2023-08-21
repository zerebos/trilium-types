import {AbstractBeccaEntity} from "./base";


interface OptionPojo {
    name: string;
    value: string;
    isSynced: boolean;
    utcDateModified: string;
}

export interface Option extends AbstractBeccaEntity<OptionPojo>, OptionPojo {
    readonly entityName: "options";
    readonly primaryKeyName: "name";
    readonly hashedProperties: ["name", "value"];
    new(row: OptionPojo): Option;
    updateFromRow(row: OptionPojo): void;
}