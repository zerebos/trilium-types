import {integer, AttributeType, LabelAttributeType, RelationAttributeType} from "../../common";

import {Froca} from "../froca";
import {Note} from "./note";


export interface AttributePojo {
    attributeId: string;
    noteId: string;
    type: AttributeType;
    name: string;
    value: string;
    position: integer;
    isInheritable: boolean;
}

export interface Attribute extends AttributePojo {
    new(froca: Froca, row: AttributePojo): Attribute;
    froca: Froca;
    update(row: AttributePojo): void;
    getNote(): Note;
    getTargetNote(): Promise<Note>;
    readonly targetNoteId: string;
    readonly isAutoLink: boolean;
    readonly toString: string;
    isDefinition(): boolean;
    getDefinition(): object;
    isDefinitionFor({type, name}: {type: AttributeType, name: string}): boolean;
    readonly dto: AttributePojo;
}

export interface Label extends Attribute {
    type: LabelAttributeType;
}

export interface Relation extends Attribute {
    type: RelationAttributeType;
}