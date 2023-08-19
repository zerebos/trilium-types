import {Attribute} from "./notes/attribute";

interface EntityChange {
    entityId: string;
    entityName: string;
    entity: any;
}

interface BranchRow {
    branchId: string;
    componentId: string;
}

interface AttributeRow {
    attributeId: string;
    componentId: string;
}

interface RevisionRow {
    revisionId: string;
    noteId: string;
    componentId: string;
}

interface NoteToComponent {
    noteId: string;
    componentId: string;
}

interface AttachmentRow {
    attachmentId: string;
    ownerId: string;
    role: string;
    mime: string;
    title: string;
    blobId: string;
    utcDateModified: string;
    isDeleted?: boolean;
}

export class LoadResults {
    new(entityChanges: EntityChange[]): LoadResults;
    noteIdToComponentId: object;
    componentIdToNoteIds: object;
    branchRows: BranchRow[];
    attributeRows: AttributeRow[];
    noteReorderings: string[];
    revisionRows: RevisionRow[];
    contentNoteIdToComponentId: NoteToComponent[];
    optionNames: string[];
    attachmentRows: AttachmentRow[];
    getEntityRow(entityName: string, entityId: string): any|undefined;
    addNote(noteId: string, componentId: string): void;
    addBranch(branchId: string, componentId: string): void;
    getBranchRows(): BranchRow[];
    addNoteReorderings(parentNoteId: string, componentId: string): void;
    getNoteReorderings(): string[];
    addAttribute(attributeId: string, componentId: string): void;
    getAttributeRows(): Attribute[];
    addRevision(revisionId: string, noteId: string, componentId: string): void;
    hasRevisionForNote(noteId: string): boolean;
    getNoteIds(): string[];
    isNoteReloaded(noteId: string, componentId?: string): boolean;
    addNoteContent(noteIds: string[], componentId: string): void;
    isNoteContentReloaded(noteId: string, componentId?: string): boolean;
    addOptions(name: string): void;
    isOptionReloaded(name: string): boolean;
    getOptionNames(): string[];
    addAttachmentRow(attachment: AttachmentRow): void;
    getAttachmentRows(): AttachmentRow[];
    hasAttributeRelatedChanges(): boolean;
    isEmpty(): boolean;
    isEmptyForTree(): boolean;
}