import {Attachment} from "./attachment";
import {Branch} from "./branch";
import {Blob} from "./blob";
import {Attribute} from "./attribute";
import {Note} from "./note";


export interface Froca {
    new(): Froca;
    initializedPromise: Promise<void>;
    notes: {[key: string]: Note};
    branches: {[key: string]: Branch};
    attributes: {[key: string]: Attribute};
    attachments: {[key: string]: Attachment};
    blobPromises: {[key: string]: Promise<Blob>};
    loadInitialTree(): Promise<void>;
    loadSubTree(subTreeNoteId: string): Promise<Note>;
    addResp(resp: object): boolean|undefined;
    reloadNotes(noteIds: ReadonlyArray<string>): Promise<void>;
    loadSearchNote(noteId: string): Promise<undefined|{error: object}>;
    getNotesFromCache(noteIds: ReadonlyArray<string>, silentNotFoundError?: boolean): Note[];
    getNotes(noteIds: ReadonlyArray<string>, silentNotFoundError?: boolean): Promise<Note[]>;
    noteExists(noteId: string): Promise<boolean>;
    getNote(noteId: string, silentNotFoundError?: boolean): Promise<Note>;
    getNoteFromCache(noteId: string): Note|null;
    getBranches(branchIds: ReadonlyArray<string>, silentNotFoundError?: boolean): Branch[];
    getBranch(branchId: string, silentNotFoundError?: boolean): Branch|undefined;
    getBranchId(parentNoteId: string, childNoteId: string): Promise<string|null>;
    getAttachment(attachmentId: string, silentNotFoundError?: boolean): Promise<Attachment>;
    getAttachmentsForNote(noteId: string): Promise<Attachment[]>;
    processAttachmentRows(attachmentRows: object[]): Attachment[];
    getBlob(entityType: string, entityId: string): Promise<Blob>;
}