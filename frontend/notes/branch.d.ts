import {integer} from "../../common";

import {Froca} from "./froca";
import {Note} from "./note";


export interface Branch {
    froca: Froca;
    /**
     * primary key
     */
    branchId: string;
    noteId: string;
    parentNoteId: string;
    notePosition: integer;
    prefix: string;
    isExpanded: boolean;
    fromSearchNote: boolean;
    getNote(): Note;
    getNoteFromCache(): Note;
    getParentNote(): Note;
    /**
     * @returns true if it's top level, meaning its parent is the root note
     */
    isTopLevel(): boolean;
}