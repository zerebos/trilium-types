import {integer} from "../../common";
import {AbstractBeccaEntity} from "./base";
import {Attachment} from "./attachment";


export class Revision extends AbstractBeccaEntity {
    revisionId: string;
    noteId: string;
    type: string;
    mime: string;
    isProtected: boolean;
    title: string;
    blobId: string;
    dateLastEdited: string;
    dateCreated: string;
    utcDateLastEdited: string;
    utcDateCreated: string;
    utcDateModified: string;
    contentLength: integer
    /**
     * @returns true if the note has string content (not binary)
     */
    hasStringContent(): boolean;
    getContent(): string | Buffer;
    /**
     * @param [opts.forceSave = false] - will also save this BRevision entity
     */
    setContent(content: any, opts?: {
        forceSave?: any;
    }): void;
    getAttachments(): Attachment[];
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