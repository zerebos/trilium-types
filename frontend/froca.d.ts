import {BlobEntityType} from "../common";
import {Attachment, AttachmentPojo} from "./entities/attachment";
import {Branch, BranchPojo} from "./entities/branch";
import {Blob} from "./entities/blob";
import {Attribute, AttributePojo} from "./entities/attribute";
import {Note, NotePojo} from "./entities/note";


interface ServerResponse {
    notes: NotePojo[];
    branches: BranchPojo[];
    attributes: AttributePojo[];
}

export declare class Froca {
    initializedPromise: Promise<void>;
    notes: Record<string, Note>;
    branches: Record<string, Branch>;
    attributes: Record<string, Attribute>;
    attachments: Record<string, Attachment>;
    blobPromises: Record<string, Promise<Blob>>;
    loadInitialTree(): Promise<void>;
    loadSubTree(subTreeNoteId: string): Promise<Note>;
    addResp(resp: ServerResponse): boolean | undefined;
    reloadNotes(noteIds: readonly string[]): Promise<void>;
    loadSearchNote(noteId: string): Promise<undefined | {error: string}>;
    getNotesFromCache(noteIds: readonly string[], silentNotFoundError?: boolean): Note[];
    getNotes(noteIds: readonly string[], silentNotFoundError?: boolean): Promise<Note[]>;
    noteExists(noteId: string): Promise<boolean>;
    getNote(noteId: string, silentNotFoundError?: boolean): Promise<Note>;
    getNoteFromCache(noteId: string): Note|null;
    getBranches(branchIds: readonly string[], silentNotFoundError?: boolean): Branch[];
    getBranch(branchId: string, silentNotFoundError?: boolean): Branch | undefined;
    getBranchId(parentNoteId: string, childNoteId: string): Promise<string | null>;
    getAttachment(attachmentId: string, silentNotFoundError?: boolean): Promise<Attachment>;
    getAttachmentsForNote(noteId: string): Promise<Attachment[]>;
    processAttachmentRows(attachmentRows: AttachmentPojo[]): Attachment[];
    getBlob(entityType: BlobEntityType, entityId: string): Promise<Blob>;
}