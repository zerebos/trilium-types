import {Becca} from "../becca";

/**
 * Base class for all backend entities.
 */
export interface AbstractBeccaEntity<Pojo> {
    readonly entityName?: string;
    readonly primaryKeyName?: string;
    readonly hashedProperties?: string[];
    /* protected*/ beforeSaving(): void;
    /* protected*/ generateIdIfNecessary(): void;
    /* protected*/ generateHash(isDeleted?: boolean): string;
    /* protected*/ getUtcDateChanged(): boolean;
    /* protected*/ becca: Becca;
    /* protected*/ putEntityChange(isDeleted?: boolean): void;
    /* protected*/ getPojoToSave(): Pojo;
    /* protected*/ getPojo(): Pojo;
    /**
     * Saves entity - executes SQL, but doesn't commit the transaction on its own
     */
    save(opts: object): this;
    /* protected*/ _setContent(content: string, opts: object): void;
    /* protected*/ _getContent(): string | Buffer;
    /**
     * Mark the entity as (soft) deleted. It will be completely erased later.
     *
     * This is a low-level method, for notes and branches use `note.deleteNote()` and 'branch.deleteBranch()` instead.
     */
    markAsDeleted(deleteId?: string): void;
    markAsDeletedSimple(): void;
}