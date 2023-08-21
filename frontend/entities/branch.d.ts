import {integer} from "../../common";

import {Froca} from "../froca";
import {Note} from "./note";


export interface BranchPojo {
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
}

export interface Branch extends BranchPojo {
    new(froca: Froca, row: BranchPojo): Branch;
    froca: Froca;
    update(row: BranchPojo): void;
    getNote(): Note;
    getNoteFromCache(): Note;
    getParentNote(): Note;
    /**
     * @returns true if it's top level, meaning its parent is the root note
     */
    isTopLevel(): boolean;
    readonly toString: string;
    readonly pojo: BranchPojo;
}