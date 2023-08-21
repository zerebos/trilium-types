import {integer} from "../../common";
import {TaskContext} from "../taskcontext";
import {AbstractBeccaEntity} from "./base";
import {Note} from "./note";


export class Branch extends AbstractBeccaEntity {
    branchId: string;
    noteId: string;
    parentNoteId: string;
    prefix: string | null;
    notePosition: integer
    isExpanded: boolean;
    utcDateModified: string;
    childNote: any;
    getNote(): Note;
    parentNote: any;
    /**
     * Branch is weak when its existence should not hinder deletion of its note.
     * As a result, note with only weak branches should be immediately deleted.
     * An example is shared or bookmarked clones - they are created automatically and exist for technical reasons,
     * not as user-intended actions. From user perspective, they don't count as real clones and for the purpose
     * of deletion should not act as a clone.
     */
    isWeak: any;
    /**
     * Delete a branch. If this is a last note's branch, delete the note as well.
     * @param [deleteId] - optional delete identified
     * @returns - true if note has been deleted, false otherwise
     */
    deleteBranch(deleteId?: string, taskContext?: TaskContext): boolean;
    protected beforeSaving(): void;
    protected generateIdIfNecessary(): void;
    protected generateHash(): void;
    protected getUtcDateChanged(): void;
    protected becca: any;
    protected putEntityChange(): void;
    protected getPojoToSave(): void;
    /**
     * Saves entity - executes SQL, but doesn't commit the transaction on its own
     */
    save(): this;
    protected _setContent(): void;
    protected _getContent(): string | Buffer;
    /**
     * Mark the entity as (soft) deleted. It will be completely erased later.
     *
     * This is a low-level method, for notes and branches use `note.deleteNote()` and 'branch.deleteBranch()` instead.
     */
    markAsDeleted(deleteId?: any): void;
}