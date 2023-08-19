import dayjs from "dayjs";
import {integer} from "../common";
import {Axios} from "axios";
import * as xmljs from "xml2js";


declare global {
    const api: BackendScriptApi;
    // const $: JQueryStatic;
    // const jQuery: JQueryStatic;
}


/**
 * Base class for all backend entities.
 */
declare class AbstractBeccaEntity {
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

declare class BAttachment extends AbstractBeccaEntity {
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
    copy(): BAttachment;
    getNote(): BNote;
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

declare class BAttribute extends AbstractBeccaEntity {
    attributeId: string;
    noteId: string;
    type: string;
    name: string;
    position: integer
    value: string;
    isInheritable: boolean;
    utcDateModified: string;
    getNote(): BNote | null;
    getTargetNote(): BNote | null;
    isDefinition(): boolean;
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

declare class BBranch extends AbstractBeccaEntity {
    branchId: string;
    noteId: string;
    parentNoteId: string;
    prefix: string | null;
    notePosition: integer
    isExpanded: boolean;
    utcDateModified: string;
    childNote: any;
    getNote(): BNote;
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

declare class BEtapiToken extends AbstractBeccaEntity {
    etapiTokenId: string;
    name: string;
    tokenHash: string;
    utcDateCreated: string;
    utcDateModified: string;
    isDeleted: boolean;
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

declare class BNote extends AbstractBeccaEntity {
    noteId: string;
    title: string;
    type: string;
    mime: string;
    isProtected: boolean;
    blobId: string;
    dateCreated: string;
    dateModified: string;
    utcDateCreated: string;
    utcDateModified: string;
    /**
     * - set during the deletion operation, before it is completed (removed from becca completely)
     */
    isBeingDeleted: boolean;
    isDecrypted: boolean;
    __flatTextCache: string | null;
    getParentBranches(): BBranch[];
    /**
     * Returns <i>strong</i> (as opposed to <i>weak</i>) parent branches. See isWeak for details.
     */
    getStrongParentBranches(): BBranch[];
    getBranches(): BBranch[];
    getParentNotes(): BNote[];
    getChildNotes(): BNote[];
    hasChildren(): boolean;
    getChildBranches(): BBranch[];
    getContent(): string | Buffer;
    getContentMetadata(): any;
    getJsonContent(): any;
    /**
     * @param [opts.forceSave = false] - will also save this BNote entity
     * @param [opts.forceFrontendReload = false] - override frontend heuristics on when to reload, instruct to reload
     */
    setContent(content: any, opts?: {
        forceSave?: any;
        forceFrontendReload?: any;
    }): void;
    /**
     * @returns true if this note is the root of the note tree. Root note has "root" noteId
     */
    isRoot(): boolean;
    /**
     * @returns true if this note is of application/json content type
     */
    isJson(): boolean;
    /**
     * @returns true if this note is JavaScript (code or attachment)
     */
    isJavaScript(): boolean;
    /**
     * @returns true if this note is HTML
     */
    isHtml(): boolean;
    /**
     * @returns true if this note is an image
     */
    isImage(): boolean;
    isStringNote(): void;
    /**
     * @returns true if the note has string content (not binary)
     */
    hasStringContent(): boolean;
    /**
     * @returns JS script environment - either "frontend" or "backend"
     */
    getScriptEnv(): string | null;
    /**
     * Beware that the method must not create a copy of the array, but actually returns its internal array
     * (for performance reasons)
     * @param [type] - (optional) attribute type to filter
     * @param [name] - (optional) attribute name to filter
     * @returns all note's attributes, including inherited ones
     */
    getAttributes(type?: string, name?: string): BAttribute[];
    hasAttribute(type: any, name: any, value?: any): boolean;
    /**
     * @param name - label name
     * @param [value] - label value
     * @returns true if label exists (including inherited)
     */
    hasLabel(name: string, value?: string): boolean;
    /**
     * @param name - label name
     * @returns true if label exists (including inherited) and does not have "false" value.
     */
    isLabelTruthy(name: string): boolean;
    /**
     * @param name - label name
     * @param [value] - label value
     * @returns true if label exists (excluding inherited)
     */
    hasOwnedLabel(name: string, value?: string): boolean;
    /**
     * @param name - relation name
     * @param [value] - relation value
     * @returns true if relation exists (including inherited)
     */
    hasRelation(name: string, value?: string): boolean;
    /**
     * @param name - relation name
     * @param [value] - relation value
     * @returns true if relation exists (excluding inherited)
     */
    hasOwnedRelation(name: string, value?: string): boolean;
    /**
     * @param name - label name
     * @returns label if it exists, null otherwise
     */
    getLabel(name: string): BAttribute | null;
    /**
     * @param name - label name
     * @returns label if it exists, null otherwise
     */
    getOwnedLabel(name: string): BAttribute | null;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getRelation(name: string): BAttribute | null;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getOwnedRelation(name: string): BAttribute | null;
    /**
     * @param name - label name
     * @returns label value if label exists, null otherwise
     */
    getLabelValue(name: string): string | null;
    /**
     * @param name - label name
     * @returns label value if label exists, null otherwise
     */
    getOwnedLabelValue(name: string): string | null;
    /**
     * @param name - relation name
     * @returns relation value if relation exists, null otherwise
     */
    getRelationValue(name: string): string | null;
    /**
     * @param name - relation name
     * @returns relation value if relation exists, null otherwise
     */
    getOwnedRelationValue(name: string): string | null;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @param [value] - attribute value
     * @returns true if note has an attribute with given type and name (excluding inherited)
     */
    hasOwnedAttribute(type: string, name: string, value?: string): boolean;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute of the given type and name. If there are more such attributes, first is returned.
     *                       Returns null if there's no such attribute belonging to this note.
     */
    getAttribute(type: string, name: string): BAttribute;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute value of given type and name or null if no such attribute exists.
     */
    getAttributeValue(type: string, name: string): string | null;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute value of given type and name or null if no such attribute exists.
     */
    getOwnedAttributeValue(type: string, name: string): string | null;
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), including inherited ones
     */
    getLabels(name?: string): BAttribute[];
    /**
     * @param [name] - label name to filter
     * @returns all note's label values, including inherited ones
     */
    getLabelValues(name?: string): string[];
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), excluding inherited ones
     */
    getOwnedLabels(name?: string): BAttribute[];
    /**
     * @param [name] - label name to filter
     * @returns all note's label values, excluding inherited ones
     */
    getOwnedLabelValues(name?: string): string[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), including inherited ones
     */
    getRelations(name?: string): BAttribute[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), excluding inherited ones
     */
    getOwnedRelations(name?: string): BAttribute[];
    /**
     * Beware that the method must not create a copy of the array, but actually returns its internal array
     * (for performance reasons)
     * @param [type = null] - (optional) attribute type to filter
     * @param [name = null] - (optional) attribute name to filter
     * @param [value = null] - (optional) attribute value to filter
     * @returns note's "owned" attributes - excluding inherited ones
     */
    getOwnedAttributes(type?: string | null, name?: string | null, value?: string | null): BAttribute[];
    /**
     * @returns attribute belonging to this specific note (excludes inherited attributes)
     *
     * This method can be significantly faster than the getAttribute()
     */
    getOwnedAttribute(): BAttribute;
    /**
     * This is used for:
     * - fast searching
     * - note similarity evaluation
     * @returns - returns flattened textual representation of note, prefixes and attributes
     */
    getFlatText(): string;
    getSubtreeNotesIncludingTemplated(): BNote[];
    getSearchResultNotes(): BNote[];
    getSubtree(): any;
    /**
     * @returns - includes the subtree root note as well
     */
    getSubtreeNoteIds(): string[];
    getDescendantNoteIds(): void;
    getAncestors(): BNote[];
    getAncestorNoteIds(): string[];
    hasAncestor(): boolean;
    getTargetRelations(): BAttribute[];
    /**
     * @returns - returns only notes which are templated, does not include their subtrees
     *                     in effect returns notes which are influenced by note's non-inheritable attributes
     */
    getInheritingNotes(): BNote[];
    getRevisions(): BRevision[];
    getAttachments(): BAttachment[];
    getAttachmentById(): BAttachment | null;
    getAttachmentByRole(): BAttachment[];
    /**
     * Gives all possible note paths leading to this note. Paths containing search note are ignored (could form cycles)
     * @returns - array of notePaths (each represented by array of noteIds constituting the particular note path)
     */
    getAllNotePaths(): string[][];
    getSortedNotePathRecords(hoistedNoteId?: string): { isArchived: boolean; isInHoistedSubTree: boolean; notePath: string[]; isHidden: boolean; }[];
    /**
     * Returns a note path considered to be the "best"
     * @returns array of noteIds constituting the particular note path
     */
    getBestNotePath(hoistedNoteId?: string): string[];
    /**
     * Returns a note path considered to be the "best"
     * @returns serialized note path (e.g. 'root/a1h315/js725h')
     */
    getBestNotePathString(hoistedNoteId?: string): string;
    /**
     * @returns boolean - true if there's no non-hidden path, note is not cloned to the visible tree
     */
    isHiddenCompletely(): any;
    /**
     * @returns - true if ancestorNoteId occurs in at least one of the note's paths
     */
    isDescendantOfNote(ancestorNoteId: any): boolean;
    /**
     * Update's given attribute's value or creates it if it doesn't exist
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @param [value] - attribute value (optional)
     */
    setAttribute(type: string, name: string, value?: string): void;
    /**
     * Removes given attribute name-value pair if it exists.
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @param [value] - attribute value (optional)
     */
    removeAttribute(type: string, name: string, value?: string): void;
    /**
     * Adds a new attribute to this note. The attribute is saved and returned.
     * See addLabel, addRelation for more specific methods.
     * @param type - attribute type (label / relation)
     * @param name - name of the attribute, not including the leading ~/#
     * @param [value] - value of the attribute - text for labels, target note ID for relations; optional.
     */
    addAttribute(type: string, name: string, value?: string, isInheritable?: boolean, position?: integer | null): BAttribute;
    /**
     * Adds a new label to this note. The label attribute is saved and returned.
     * @param name - name of the label, not including the leading #
     * @param [value] - text value of the label; optional
     */
    addLabel(name: string, value?: string, isInheritable?: boolean): BAttribute;
    /**
     * Adds a new relation to this note. The relation attribute is saved and
     * returned.
     * @param name - name of the relation, not including the leading ~
     */
    addRelation(name: string, targetNoteId: string, isInheritable?: boolean): BAttribute;
    /**
     * Based on enabled, the attribute is either set or removed.
     * @param type - attribute type ('relation', 'label' etc.)
     * @param enabled - toggle On or Off
     * @param name - attribute name
     * @param [value] - attribute value (optional)
     */
    toggleAttribute(type: string, enabled: boolean, name: string, value?: string): void;
    /**
     * Based on enabled, label is either set or removed.
     * @param enabled - toggle On or Off
     * @param name - label name
     * @param [value] - label value (optional)
     */
    toggleLabel(enabled: boolean, name: string, value?: string): void;
    /**
     * Based on enabled, relation is either set or removed.
     * @param enabled - toggle On or Off
     * @param name - relation name
     * @param [value] - relation value (noteId)
     */
    toggleRelation(enabled: boolean, name: string, value?: string): void;
    /**
     * Update's given label's value or creates it if it doesn't exist
     * @param name - label name
     * @param [value] - label value
     */
    setLabel(name: string, value?: string): void;
    /**
     * Update's given relation's value or creates it if it doesn't exist
     * @param name - relation name
     * @param value - relation value (noteId)
     */
    setRelation(name: string, value: string): void;
    /**
     * Remove label name-value pair, if it exists.
     * @param name - label name
     * @param [value] - label value
     */
    removeLabel(name: string, value?: string): void;
    /**
     * Remove the relation name-value pair, if it exists.
     * @param name - relation name
     * @param [value] - relation value (noteId)
     */
    removeRelation(name: string, value?: string): void;
    cloneTo(parentNoteId: any): any;
    /**
     * Some notes are eligible for conversion into an attachment of its parent, note must have these properties:
     * - it has exactly one target relation
     * - it has a relation from its parent note
     * - it has no children
     * - it has no clones
     * - the parent is of type text
     * - both notes are either unprotected or user is in protected session
     *
     * Currently, works only for image notes.
     *
     * In the future, this functionality might get more generic and some of the requirements relaxed.
     * @returns - null if note is not eligible for conversion
     */
    convertToParentAttachment(): BAttachment | null;
    /**
     * (Soft) delete a note and all its descendants.
     * @param [deleteId = null] - optional delete identified
     */
    deleteNote(deleteId?: string, taskContext?: TaskContext): void;
    saveRevision(): BRevision | null;
    saveAttachment(): BAttachment;
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

declare class BOption extends AbstractBeccaEntity {
    name: string;
    value: string;
    isSynced: boolean;
    utcDateModified: string;
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

declare class BRecentNote extends AbstractBeccaEntity {
    noteId: string;
    notePath: string;
    utcDateCreated: string;
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

declare class BRevision extends AbstractBeccaEntity {
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
    getAttachments(): BAttachment[];
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

/**
 * <p>This is the main backend API interface for scripts. All the properties and methods are published in the "api" object
 * available in the JS backend notes. You can use e.g. <code>api.log(api.startNote.title);</code></p>
 */
export default class BackendScriptApi {
    constructor();
    /**
     * Note where the script started executing
     */
    startNote: BNote;
    /**
     * Note where the script is currently executing. Don't mix this up with the concept of active note
     */
    currentNote: BNote;
    /**
     * Entity whose event triggered this execution
     */
    originEntity: AbstractBeccaEntity;
    /**
     * Axios library for HTTP requests. See {@link https://axios-http.com} for documentation
     */
    axios: typeof Axios;
    /**
     * day.js library for date manipulation. See {@link https://day.js.org} for documentation
     */
    dayjs: typeof dayjs;
    /**
     * xml2js library for XML parsing. See {@link https://github.com/Leonidas-from-XIV/node-xml2js} for documentation
     */
    xml2js: typeof xmljs;
    /**
     * Instance name identifies particular Trilium instance. It can be useful for scripts
     * if some action needs to happen on only one specific instance.
     */
    getInstanceName(): string | null;
    getNote(noteId: string): BNote | null;
    getBranch(branchId: string): BBranch | null;
    getAttribute(attributeId: string): BAttribute | null;
    /**
     * This is a powerful search method - you can search by attributes and their values, e.g.:
     * "#dateModified =* MONTH AND #log". See {@link https://github.com/zadam/trilium/wiki/Search} for full documentation for all options
     */
    searchForNotes(query: string, searchParams?: any): BNote[];
    /**
     * This is a powerful search method - you can search by attributes and their values, e.g.:
     * "#dateModified =* MONTH AND #log". See {@link https://github.com/zadam/trilium/wiki/Search} for full documentation for all options
     */
    searchForNote(query: string, searchParams?: any): BNote | null;
    /**
     * Retrieves notes with given label name & value
     * @param name - attribute name
     * @param [value] - attribute value
     */
    getNotesWithLabel(name: string, value?: string): BNote[];
    /**
     * Retrieves first note with given label name & value
     * @param name - attribute name
     * @param [value] - attribute value
     */
    getNoteWithLabel(name: string, value?: string): BNote | null;
    /**
     * If there's no branch between note and parent note, create one. Otherwise, do nothing. Returns the new or existing branch.
     * @param prefix - if branch is created between note and parent note, set this prefix
     */
    ensureNoteIsPresentInParent(noteId: string, parentNoteId: string, prefix: string): any;
    /**
     * If there's a branch between note and parent note, remove it. Otherwise, do nothing.
     */
    ensureNoteIsAbsentFromParent(noteId: string, parentNoteId: string): void;
    /**
     * Based on the value, either create or remove branch between note and parent note.
     * @param present - true if we want the branch to exist, false if we want it gone
     * @param prefix - if branch is created between note and parent note, set this prefix
     */
    toggleNoteInParent(present: boolean, noteId: string, parentNoteId: string, prefix: string): void;
    /**
     * Create text note. See also createNewNote() for more options.
     * @returns - object having "note" and "branch" keys representing respective objects
     */
    createTextNote(parentNoteId: string, title: string, content: string): any;
    /**
     * Create data note - data in this context means object serializable to JSON. Created note will be of type 'code' and
     * JSON MIME type. See also createNewNote() for more options.
     * @returns object having "note" and "branch" keys representing respective objects
     */
    createDataNote(parentNoteId: string, title: string, content: any): any;
    /**
     * @param params.type - text, code, file, image, search, book, relationMap, canvas
     * @param [params.mime] - value is derived from default mimes for type
     * @param [params.notePosition] - default is last existing notePosition in a parent + 10
     * @returns object contains newly created entities note and branch
     */
    createNewNote(params: {
        parentNoteId: string;
        title: string;
        content: string | Buffer;
        type: string;
        mime?: string;
        isProtected?: boolean;
        isExpanded?: boolean;
        prefix?: string;
        notePosition?: integer;
    }): any;
    /**
     * @param parentNoteId - create new note under this parent
     * @param [extraOptions.json = false] - should the note be JSON
     * @param [extraOptions.isProtected = false] - should the note be protected
     * @param [extraOptions.type = 'text'] - note type
     * @param [extraOptions.mime = 'text/html'] - MIME type of the note
     * @param [extraOptions.attributes = []] - attributes to be created for this note
     * @param extraOptions.attributes.type - attribute type - label, relation etc.
     * @param extraOptions.attributes.name - attribute name
     * @param [extraOptions.attributes.value] - attribute value
     * @returns object contains newly created entities note and branch
     */
    createNote(parentNoteId: string, title: string, content?: string, extraOptions?: {
        json?: boolean;
        isProtected?: boolean;
        type?: string;
        mime?: string;
        attributes?: {
            type: string;
            name: string;
            value?: string;
        }[];
    }): any;
    /**
     * Log given message to trilium logs and log pane in UI
     */
    log(message: any): void;
    /**
     * Returns root note of the calendar.
     */
    getRootCalendarNote(): BNote | null;
    /**
     * Returns day note for given date. If such note doesn't exist, it is created.
     * @param date - in YYYY-MM-DD format
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getDayNote(date: string, rootNote?: BNote): BNote | null;
    /**
     * Returns today's day note. If such note doesn't exist, it is created.
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getTodayNote(rootNote?: BNote): BNote | null;
    /**
     * Returns note for the first date of the week of the given date.
     * @param date - in YYYY-MM-DD format
     * @param [options.startOfTheWeek = monday] - either "monday" (default) or "sunday"
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getWeekNote(date: string, options?: {
        startOfTheWeek?: string;
    }, rootNote?: BNote): BNote | null;
    /**
     * Returns month note for given date. If such note doesn't exist, it is created.
     * @param date - in YYYY-MM format
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getMonthNote(date: string, rootNote?: BNote): BNote | null;
    /**
     * Returns year note for given year. If such note doesn't exist, it is created.
     * @param year - in YYYY format
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getYearNote(year: string, rootNote?: BNote): BNote | null;
    /**
     * Sort child notes of a given note.
     * @param parentNoteId - this note's child notes will be sorted
     * @param [sortConfig.sortBy = title] - 'title', 'dateCreated', 'dateModified' or a label name
     *                                See {@link https://github.com/zadam/trilium/wiki/Sorting} for details.
     */
    sortNotes(parentNoteId: string, sortConfig?: {
        sortBy?: string;
        reverse?: boolean;
        foldersFirst?: boolean;
    }): void;
    /**
     * This method finds note by its noteId and prefix and either sets it to the given parentNoteId
     * or removes the branch (if parentNoteId is not given).
     *
     * This method looks similar to toggleNoteInParent() but differs because we're looking up branch by prefix.
     */
    setNoteToParent(noteId: string, prefix: string, parentNoteId: string | null): void;
    /**
     * This functions wraps code which is supposed to be running in transaction. If transaction already
     * exists, then we'll use that transaction.
     * @returns result of func callback
     */
    transactional(func: (...params: any[]) => any): any;
    /**
     * Return randomly generated string of given length. This random string generation is NOT cryptographically secure.
     * @param length - of the string
     * @returns random string
     */
    randomString(length: integer): string;
    /**
     * @param string - to escape
     * @returns escaped string
     */
    escapeHtml(string: string): string;
    /**
     * @param string - to unescape
     * @returns unescaped string
     */
    unescapeHtml(string: string): string;
    /**
     * sql
     */
    sql: sql;
    /**
     * @returns - object representing basic info about running Trilium version
     */
    getAppInfo(): any | any;
    /**
     * Creates a new launcher to the launchbar. If the launcher (id) already exists, it will be updated.
     * @param opts.id - id of the launcher, only alphanumeric at least 6 characters long
     * @param opts.type - one of
     *                          * "note" - activating the launcher will navigate to the target note (specified in targetNoteId param)
     *                          * "script" -  activating the launcher will execute the script (specified in scriptNoteId param)
     *                          * "customWidget" - the launcher will be rendered with a custom widget (specified in widgetNoteId param)
     * @param [opts.isVisible = false] - if true, will be created in the "Visible launchers", otherwise in "Available launchers"
     * @param [opts.icon] - name of the boxicon to be used (e.g. "bx-time")
     * @param [opts.keyboardShortcut] - will activate the target note/script upon pressing, e.g. "ctrl+e"
     * @param [opts.targetNoteId] - for type "note"
     * @param [opts.scriptNoteId] - for type "script"
     * @param [opts.widgetNoteId] - for type "customWidget"
     */
    createOrUpdateLauncher(opts: {
        id: string;
        type: string;
        title: string;
        isVisible?: boolean;
        icon?: string;
        keyboardShortcut?: string;
        targetNoteId?: string;
        scriptNoteId?: string;
        widgetNoteId?: string;
    }): any;
    /**
     * @param format - either 'html' or 'markdown'
     */
    exportSubtreeToZipFile(noteId: string, format: string, zipFilePath: string): Promise<void>;
    /**
     * This object contains "at your risk" and "no BC guarantees" objects for advanced use cases.
     * @property {object} becca - provides access to the backend in-memory object graph, see {@link https://github.com/zadam/trilium/blob/master/src/becca/becca.js}
     */
    __private: {
        becca: object; // Leaving this intentionally generic typed as an object since this is not really meant to be a guaranteed part of the api.
    };
}

declare interface sql {
    /**
     * Get single value from the given query - first column from first returned row.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns [object] - single value
     */
    getValue(query: string, params?: object[]): any;
    /**
     * Get first returned row.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - map of column name to column value
     */
    getRow(query: string, params?: object[]): any;
    /**
     * Get all returned rows.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - array of all rows, each row is a map of column name to column value
     */
    getRows(query: string, params?: object[]): object[];
    /**
     * Get a map of first column mapping to second column.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - map of first column to second column
     */
    getMap(query: string, params?: object[]): any;
    /**
     * Get a first column in an array.
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     * @returns - array of first column of all returned rows
     */
    getColumn(query: string, params?: object[]): object[];
    /**
     * Execute SQL
     * @param query - SQL query with ? used as parameter placeholder
     * @param [params] - array of params if needed
     */
    execute(query: string, params?: object[]): void;
}


declare class TaskContext {
    constructor(taskId: string, taskType?: string, data?: object);
    taskId: string;
    taskType: string;
    data: object;
    noteDeletionHandlerTriggered: boolean;
    progressCount: integer;
    lastSentCountTs: integer;
    getInstance(taskId: string, taskType: string, data?: object|null): Promise<TaskContext>;
    increaseProgressCount(): void;
    reportError(message: string): void;
    taskSucceeded(result: any): void;
}