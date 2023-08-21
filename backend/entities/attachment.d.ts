import {integer} from "../../common";
import {AbstractBeccaEntity} from "./base";
import {Note} from "./note";


export class Attachment extends AbstractBeccaEntity {
    attachmentId: string;
    /**
     * either noteId or revisionId to which this attachment belongs
     */
    ownerId: string;
    role: string;
    mime: string;
    title: string;
    position: integer
    blobId: string;
    isProtected: boolean;
    dateModified: string;
    utcDateModified: string;
    utcDateScheduledForErasureSince: string;
    /**
     * optionally added to the entity
     */
    contentLength: integer
    copy(): Attachment;
    getNote(): Note;
    /**
     * @returns true if the note has string content (not binary)
     */
    hasStringContent(): boolean;
    getContent(): string | Buffer;
    /**
     * @param [opts.forceSave = false] - will also save this BAttachment entity
     * @param [opts.forceFrontendReload = false] - override frontend heuristics on when to reload, instruct to reload
     */
    setContent(content: any, opts?: {
        forceSave?: any;
        forceFrontendReload?: any;
    }): void;
    convertToNote(): any;
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