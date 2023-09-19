import {integer} from "../../common";
import {TaskContext} from "../taskcontext";
import {AbstractBeccaEntity} from "./base";
import {Note} from "./note";


interface BranchPojo {
    branchId: string;
    noteId: string;
    parentNoteId: string;
    prefix: string;
    notePosition: integer;
    isExpanded: boolean;
    isDeleted?: boolean;
    utcDateModified: string;
}

export interface Branch extends AbstractBeccaEntity<BranchPojo>, BranchPojo {
    readonly entityName: "branches";
    readonly primaryKeyName: "branchId";
    readonly hashedProperties: ["branchId", "noteId", "parentNoteId", "prefix"];
    // new(row: BranchPojo): Branch;
    updateFromRow(row: BranchPojo): void;
    init(): void;
    readonly childNote: Note;
    getNote(): Note;
    readonly parentNote: Note;
    readonly isDeleted?: boolean;
    /**
     * Branch is weak when its existence should not hinder deletion of its note.
     * As a result, note with only weak branches should be immediately deleted.
     * An example is shared or bookmarked clones - they are created automatically and exist for technical reasons,
     * not as user-intended actions. From user perspective, they don't count as real clones and for the purpose
     * of deletion should not act as a clone.
     */
    readonly isWeak: boolean;
    /**
     * Delete a branch. If this is a last note's branch, delete the note as well.
     * @param [deleteId] - optional delete identified
     * @returns - true if note has been deleted, false otherwise
     */
    deleteBranch(deleteId?: string, taskContext?: TaskContext): boolean;
    createClone(parentNoteId: string, notePosition: integer): Branch;
}