import {integer} from "../../common";

import {Froca} from "./froca";
import {Note} from "./note";


export interface Attribute {
    froca: Froca;
    attributeId: string;
    noteId: string;
    type: string;
    name: string;
    value: string;
    position: integer;
    isInheritable: boolean;
    getNote(): Note;
    getTargetNote(): Promise<Note>;
}