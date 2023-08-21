import {LabelAttributeType, RelationAttributeType, integer} from "../../common";
import {AbstractBeccaEntity} from "./base";
import {Note} from "./note";


interface AttributePojo {
    attributeId: string;
    noteId: string;
    type: string;
    name: string;
    position: integer;
    value: string;
    isInheritable: boolean;
    utcDateModified: string;
    isDeleted?: boolean;
}

export interface Attribute extends AbstractBeccaEntity<AttributePojo>, AttributePojo {
    readonly entityName: "attributes";
    readonly primaryKeyName: "attributeId";
    readonly hashedProperties: ["attributeId", "noteId", "type", "name", "value", "isInheritable"];
    new(row: AttributePojo): Attribute;
    updateFromRow(row: AttributePojo): void;
    init(): void;
    validate(): void;
    readonly isAffectingSubtree: boolean;
    readonly targetNoteId: string;
    isAutoLink(): boolean;
    readonly note: Note;
    readonly targetNote: Note;
    getNote(): Note | null;
    getTargetNote(): Note | null;
    isDefinition(): boolean;
    getDefinition(): object;
    getDefinedName(): string;
    readonly isDeleted: boolean;
    createClone(type: string, name: string, value: string, isInheritable: boolean): Attribute;
}

export interface Label extends Attribute {
    type: LabelAttributeType;
}

export interface Relation extends Attribute {
    type: RelationAttributeType;
}