import {AttributeType} from "../common";
import {Attribute, Branch, ETAPIToken, Note, Option, Revision, Attachment, RecentNote, Blob} from "./entities";
import {NoteSet} from "./noteset";

export interface Becca {
    notes: Record<string, Note>;
    branches: Record<string, Branch>;
    childParentToBranch: Record<string, Branch>;
    attributes: Record<string, Attribute>;
    attributeIndex: Record<string, Attribute[]>;
    options: Record<string, Option>;
    etapiTokens: Record<string, ETAPIToken>;
    loaded?: boolean;
    allNoteSetCache?: NoteSet | null;
    new(): Becca;
    reset(): void;
    getRoot(): Note;
    findAttributes(type: AttributeType, name: string): Attribute[];
    findAttributesWithPrefix(type: AttributeType, name: string): Attribute[];
    decryptProtectedNotes(): void;
    addNote(noteId: string, note: Note): void;
    getNote(noteId: string): Note | null;
    /**
     * @throws
     */
    getNoteOrThrow(noteId: string): Note;
    getNotes(noteIds: ReadonlyArray<string>, ignoreMissing?: boolean): Note[];
    getBranch(branchId: string): Branch | null;
    /**
     * @throws
     */
    getBranchOrThrow(branchId: string): Branch;
    getAttribute(attributeId: string): Attribute | null;
    /**
     * @throws
     */
    getAttributeOrThrow(attributeId: string): Attribute;
    getBranchFromChildAndParent(childNoteId: string, parentNoteId: string): Branch | null;
    getRevision(revisionId: string): Revision;
    getAttachment(attachmentId: string): Attachment | null;
    /**
     * @throws
     */
    getAttachmentOrThrow(attachmentId: string): Attachment;
    getAttachments(attachmentIds: ReadonlyArray<string>): Attachment[];
    getBlob(entity: {blobId: string}): Blob;
    getOption(name: string): Option;
    getEtapiTokens(): ETAPIToken[];
    getEntity<T>(entityName: string, entityId: string): T;
    getRecentNotesFromQuery(query: string, params: ReadonlyArray<string>): RecentNote[];
    getRevisionsFromQuery(query: string, params: ReadonlyArray<string>): Revision[];
    dirtyNoteSetCache(): void;
    getAllNoteSet(): NoteSet | null;
}