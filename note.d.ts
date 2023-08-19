import {integer} from "../common";

import {Editor} from "codemirror";
import {BalloonEditor} from "@ckeditor/ckeditor5-editor-balloon";

import {Component} from "./component";
import {LoadResults} from "./loadresults";
import {TypeWidget} from "./widgets";


export interface Note {
    new(froca: Froca, row: {
        [key: string]: object;
    }): Note;
    froca: Froca;
    attributes: string[];
    targetRelations: string[];
    parents: string[];
    children: string[];
    parentToBranch: {
        [key: string]: string;
    };
    childToBranch: {
        [key: string]: string;
    };
    attachments: Attachment[] | null;
    noteId: string;
    title: string;
    isProtected: boolean;
    /**
     * one of 'text', 'code', 'file' or 'render'
     */
    type: string;
    /**
     * content-type, e.g. "application/json"
     */
    mime: string;
    isJson(): boolean;
    getParentBranchIds(): string[];
    getBranchIds(): string[];
    getParentBranches(): Branch[];
    getBranches(): Branch[];
    hasChildren(): boolean;
    getChildBranches(): Branch[];
    getParentNoteIds(): string[];
    getParentNotes(): Note[];
    getChildNoteIds(): string[];
    getChildNotes(): Promise<Note[]>;
    getAttachments(): Promise<Attachment[]>;
    getAttachmentById(): Promise<Attachment>;
    /**
     * @param [type] - (optional) attribute type to filter
     * @param [name] - (optional) attribute name to filter
     * @returns all note's attributes, including inherited ones
     */
    getOwnedAttributes(type?: string, name?: string): Attribute[];
    /**
     * @param [type] - (optional) attribute type to filter
     * @param [name] - (optional) attribute name to filter
     * @returns all note's attributes, including inherited ones
     */
    getAttributes(type?: string, name?: string): Attribute[];
    /**
     * Gives all possible note paths leading to this note. Paths containing search note are ignored (could form cycles)
     * @returns - array of notePaths (each represented by array of noteIds constituting the particular note path)
     */
    getAllNotePaths(): string[];
    getSortedNotePathRecords(hoistedNoteId?: string): {isArchived: boolean; isInHoistedSubTree: boolean; isSearch: boolean; notePath: string[]; isHidden: boolean;}[];
    /**
     * Returns the note path considered to be the "best"
     * @returns array of noteIds constituting the particular note path
     */
    getBestNotePath(hoistedNoteId?: string): string[];
    /**
     * Returns the note path considered to be the "best"
     * @returns serialized note path (e.g. 'root/a1h315/js725h')
     */
    getBestNotePathString(hoistedNoteId?: string): string;
    /**
     * @returns boolean - true if there's no non-hidden path, note is not cloned to the visible tree
     */
    isHiddenCompletely(): any;
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), including inherited ones
     */
    getOwnedLabels(name?: string): Attribute[];
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), including inherited ones
     */
    getLabels(name?: string): Attribute[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), including inherited ones
     */
    getOwnedRelations(name?: string): Attribute[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), including inherited ones
     */
    getRelations(name?: string): Attribute[];
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns true if note has an attribute with given type and name (including inherited)
     */
    hasAttribute(type: string, name: string): boolean;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns true if note has an attribute with given type and name (including inherited)
     */
    hasOwnedAttribute(type: string, name: string): boolean;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute of the given type and name. If there are more such attributes, first is returned. Returns null if there's no such attribute belonging to this note.
     */
    getOwnedAttribute(type: string, name: string): Attribute;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute of the given type and name. If there are more such attributes, first is returned. Returns null if there's no such attribute belonging to this note.
     */
    getAttribute(type: string, name: string): Attribute;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute value of the given type and name or null if no such attribute exists.
     */
    getOwnedAttributeValue(type: string, name: string): string;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute value of the given type and name or null if no such attribute exists.
     */
    getAttributeValue(type: string, name: string): string;
    /**
     * @param name - label name
     * @returns true if label exists (excluding inherited)
     */
    hasOwnedLabel(name: string): boolean;
    /**
     * @param name - label name
     * @returns true if label exists (including inherited)
     */
    hasLabel(name: string): boolean;
    /**
     * @param name - label name
     * @returns true if label exists (including inherited) and does not have "false" value.
     */
    isLabelTruthy(name: string): boolean;
    /**
     * @param name - relation name
     * @returns true if relation exists (excluding inherited)
     */
    hasOwnedRelation(name: string): boolean;
    /**
     * @param name - relation name
     * @returns true if relation exists (including inherited)
     */
    hasRelation(name: string): boolean;
    /**
     * @param name - label name
     * @returns label if it exists, null otherwise
     */
    getOwnedLabel(name: string): Attribute;
    /**
     * @param name - label name
     * @returns label if it exists, null otherwise
     */
    getLabel(name: string): Attribute;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getOwnedRelation(name: string): Attribute;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getRelation(name: string): Attribute;
    /**
     * @param name - label name
     * @returns label value if label exists, null otherwise
     */
    getOwnedLabelValue(name: string): string;
    /**
     * @param name - label name
     * @returns label value if label exists, null otherwise
     */
    getLabelValue(name: string): string;
    /**
     * @param name - relation name
     * @returns relation value if relation exists, null otherwise
     */
    getOwnedRelationValue(name: string): string;
    /**
     * @param name - relation name
     * @returns relation value if relation exists, null otherwise
     */
    getRelationValue(name: string): string;
    /**
     * @returns target note of the relation or null (if target is empty or note was not found)
     */
    getRelationTarget(name: string): Promise<Note> | null;
    /**
     * @param [name] - relation name to filter
     */
    getRelationTargets(name?: string): Promise<Note[]>;
    getNotesToInheritAttributesFrom(): Note[];
    invalidateAttributeCache(): void;
    /**
     * Get relations which target this note
     */
    getTargetRelations(): Attribute[];
    /**
     * Get relations which target this note
     */
    getTargetRelationSourceNotes(): Promise<Note[]>;
    getNoteComplement(): Promise<Blob>;
    getBlob(): Promise<Blob>;
    /**
     * @returns true if this note is JavaScript (code or file)
     */
    isJavaScript(): boolean;
    /**
     * @returns true if this note is HTML
     */
    isHtml(): boolean;
    /**
     * @returns JS script environment - either "frontend" or "backend"
     */
    getScriptEnv(): string | null;
}


export declare interface Attachment {
    froca: Froca;
    attachmentId: string;
    ownerId: string;
    role: string;
    mime: string;
    title: string;
    dateModified: string;
    utcDateModified: string;
    utcDateScheduledForErasureSince: string;
    /**
     * optionally added to the entity
     */
    contentLength: integer;
    getNote(): Note;
    getBlob(): Blob;
}


export interface Attribute {
    froca: Froca;
    attributeId: string;
    noteId: string;
    type: string;
    name: string;
    value: string;
    position: integer;
    isInheritable: boolean;
    getNote(): Note;
    getTargetNote(): Promise<Note>;
}


export interface Blob {
    new(): Blob;
    blobId: string;
    /**
     * can either contain the whole content (in e.g. string notes), only part (large text notes) or nothing at all (binary notes, images)
     */
    content: string;
    contentLength: integer;
    dateModified: string;
    utcDateModified: string;
}


export interface Branch {
    froca: Froca;
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
    getNote(): Note;
    getNoteFromCache(): Note;
    getParentNote(): Note;
    /**
     * @returns true if it's top level, meaning its parent is the root note
     */
    isTopLevel(): boolean;
}


interface PojoState {
    ntxId: string,
    mainNtxId: string,
    notePath: string,
    hoistedNoteId: string,
    active: boolean,
    viewScope: object
}

export interface NoteContext extends Component {
    new(ntxId?: string, hoistedNoteId?: string, mainNtxId?: string|null): NoteContext;
    ntxId: string;
    hoisedNoteId: string;
    mainNtxId: string;
    viewScope: object;
    readonly note: Note|null;
    readonly notePathArray: string[];
    generateNtxId(): string;
    setEmpty(): void;
    isEmpty(): boolean;
    setNote(inputNotePath: string, opts?: object): Promise<void>;
    resolveNotePath(): Promise<void>;
    getSubContexts(): NoteContext[];
    isMainContext(): boolean;
    getMainContext(): NoteContext;
    saveToRecentNotes(resolvedNotePath: string): void;
    getResolvedNotePath(inputNotePath: string): Promise<void>;
    isActive(): boolean;
    getPojoState(): PojoState;
    unhoist(): Promise<void>;
    setHoistedNoteId(noteIdToHoist: string): Promise<void>;
    isReadOnly(): Promise<boolean>;
    entitiesReloadedEvent({loadResults}: {loadResults: LoadResults}): Promise<void>;
    hasNoteList(): boolean;
    getTextEditor(callback: CallableFunction): Promise<BalloonEditor>;
    getCodeEditor(): Promise<Editor>;
    getContentElement(): Promise<HTMLElement>;
    getTypeWidget(): Promise<TypeWidget>
    resetViewScope(): void;
    getNavigationTitle(): string;
}


export interface Froca {
    new(): Froca;
    initializedPromise: Promise<void>;
    notes: {[key: string]: Note}[];
    branches: {[key: string]: Branch}[];
    attributes: {[key: string]: Attribute}[];
    attachments: {[key: string]: Attachment}[];
    blobPromises: {[key: string]: Promise<Blob>}[];
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