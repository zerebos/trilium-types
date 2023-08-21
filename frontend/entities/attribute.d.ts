import {integer} from "../../common";

import {Froca} from "../froca";
import {Note} from "./note";


type LabelType = "label";
type RelationType = "label";
type AttributeType = LabelType | RelationType

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
}

export interface Label extends Attribute {
    type: LabelType;
}

export interface Relation extends Attribute {
    type: RelationType;
}