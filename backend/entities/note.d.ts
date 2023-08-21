import dayjs from "dayjs";
import {NotePathRecord, integer} from "../../common";
import {TaskContext} from "../taskcontext";
import {AbstractBeccaEntity} from "./base";
import {Branch} from "./branch";
import {Attribute, Label, Relation} from "./attribute";
import {Attachment} from "./attachment";
import {Revision} from "./revision";


interface NotePojo {
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
    isDeleted?: boolean;
}

export interface Note extends AbstractBeccaEntity<NotePojo>, NotePojo {
    readonly entityName: "attributes";
    readonly primaryKeyName: "attributeId";
    readonly hashedProperties: ["attributeId", "noteId", "type", "name", "value", "isInheritable"];
    new(row: NotePojo): Note;
    updateFromRow(row: NotePojo): void;
    init(): void;
    isContentAvailable(): boolean;
    getTitleOrProtected(): boolean;

    /**
     * - set during the deletion operation, before it is completed (removed from becca completely)
     */
    isBeingDeleted: boolean;
    isDecrypted: boolean;
    __flatTextCache: string | null;
    getParentBranches(): Branch[];
    /**
     * Returns <i>strong</i> (as opposed to <i>weak</i>) parent branches. See isWeak for details.
     */
    getStrongParentBranches(): Branch[];
    getBranches(): Branch[];
    getParentNotes(): Note[];
    getChildNotes(): Note[];
    hasChildren(): boolean;
    getChildBranches(): Branch[];
    getContent(): string | Buffer;
    getContentMetadata(): {dateModified: string, utcDateModified: string};
    getJsonContent(): Record<string, any>;
    /**
     * @param [opts.forceSave = false] - will also save this Note entity
     * @param [opts.forceFrontendReload = false] - override frontend heuristics on when to reload, instruct to reload
     */
    setContent(content: any, opts?: {
        forceSave?: any;
        forceFrontendReload?: any;
    }): void;

    setJsonContent(content: Record<string, any>): void;
    readonly dateCreatedObj: ReturnType<typeof dayjs>;
    readonly utcDateCreatedObj: ReturnType<typeof dayjs>;
    readonly dateModifiedObj: ReturnType<typeof dayjs>;
    readonly utcDateModifiedObj: ReturnType<typeof dayjs>;
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
    /**
     * @deprecated use hasStringContent()
     */
    isStringNote(): boolean;
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
    getAttributes(type?: string, name?: string): Attribute[];
    hasAttribute(type: any, name: any, value?: any): boolean;
    getAttributeCaseInsensitive(type: string, name: string, value: string): Attribute;
    getRelationTarget(name: string): Note;
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
    getLabel(name: string): Label | null;
    /**
     * @param name - label name
     * @returns label if it exists, null otherwise
     */
    getOwnedLabel(name: string): Label | null;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getRelation(name: string): Relation | null;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getOwnedRelation(name: string): Relation | null;
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
    getAttribute(type: string, name: string): Attribute;
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
    getLabels(name?: string): Label[];
    /**
     * @param [name] - label name to filter
     * @returns all note's label values, including inherited ones
     */
    getLabelValues(name?: string): string[];
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), excluding inherited ones
     */
    getOwnedLabels(name?: string): Label[];
    /**
     * @param [name] - label name to filter
     * @returns all note's label values, excluding inherited ones
     */
    getOwnedLabelValues(name?: string): string[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), including inherited ones
     */
    getRelations(name?: string): Relation[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), excluding inherited ones
     */
    getOwnedRelations(name?: string): Relation[];
    /**
     * Beware that the method must not create a copy of the array, but actually returns its internal array
     * (for performance reasons)
     * @param [type = null] - (optional) attribute type to filter
     * @param [name = null] - (optional) attribute name to filter
     * @param [value = null] - (optional) attribute value to filter
     * @returns note's "owned" attributes - excluding inherited ones
     */
    getOwnedAttributes(type?: string | null, name?: string | null, value?: string | null): Attribute[];
    /**
     * @returns attribute belonging to this specific note (excludes inherited attributes)
     *
     * This method can be significantly faster than the getAttribute()
     */
    getOwnedAttribute(type: string, name: string, value?: string): Attribute;
    readonly isArchived: boolean;
    areAllNotePathsArchived(): boolean;
    hasInheritableArchivedLabel(): boolean;
    sortParents(): void;
    sortChildren(): void;
    /**
     * This is used for:
     * - fast searching
     * - note similarity evaluation
     * @returns - returns flattened textual representation of note, prefixes and attributes
     */
    getFlatText(): string;
    invalidateThisCache(): void;
    invalidateSubTree(path: ReadonlyArray<string>): void;
    getRelationDefinition(): object;
    getLabelDefinition(): object;
    isInherited(): boolean;
    getSubtreeNotesIncludingTemplated(): Note[];
    getSearchResultNotes(): Note[];
    getSubtree(): {notes: Note[], relationships: Array<{parentNoteId: string, childNoteId: string}>};
    /**
     * @returns - includes the subtree root note as well
     */
    getSubtreeNoteIds(): string[];
    getDescendantNoteIds(): void;
    readonly parentCount: integer;
    readonly childrenCount: integer;
    readonly labelCount: integer;
    readonly ownedLabelCount: integer;
    readonly relationCount: integer;
    readonly relationCountIncludingLinks: integer;
    readonly ownedRelationCount: integer;
    readonly ownedRelationCountIncludingLinks: integer;
    readonly targetRelationCount: integer;
    readonly targetRelationCountIncludingLinks: integer;
    readonly attributeCount: integer;
    readonly ownedAttributeCount: integer;
    getAncestors(): Note[];
    getAncestorNoteIds(): string[];
    hasAncestor(): boolean;
    isInHiddenSubtree(): boolean;
    getTargetRelations(): Relation[];
    /**
     * @returns - returns only notes which are templated, does not include their subtrees
     *                     in effect returns notes which are influenced by note's non-inheritable attributes
     */
    getInheritingNotes(): Note[];
    getDistanceToAncestor(ancestorNoteId: string): integer;
    getRevisions(): Revision[];
    getAttachments({includeContentLength}?: {includeContentLength: boolean}): Attachment[];
    getAttachmentById(attachmentId: string, {includeContentLength}?: {includeContentLength: boolean}): Attachment | null;
    getAttachmentByRole(role: string): Attachment[];
    /**
     * Gives all possible note paths leading to this note. Paths containing search note are ignored (could form cycles)
     * @returns - array of notePaths (each represented by array of noteIds constituting the particular note path)
     */
    getAllNotePaths(): string[][];
    getSortedNotePathRecords(hoistedNoteId?: string): NotePathRecord[];
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
    isHiddenCompletely(): boolean;
    /**
     * @returns - true if ancestorNoteId occurs in at least one of the note's paths
     */
    isDescendantOfNote(ancestorNoteId: string): boolean;
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
    addAttribute(type: string, name: string, value?: string, isInheritable?: boolean, position?: integer | null): Attribute;
    /**
     * Adds a new label to this note. The label attribute is saved and returned.
     * @param name - name of the label, not including the leading #
     * @param [value] - text value of the label; optional
     */
    addLabel(name: string, value?: string, isInheritable?: boolean): Label;
    /**
     * Adds a new relation to this note. The relation attribute is saved and
     * returned.
     * @param name - name of the relation, not including the leading ~
     */
    addRelation(name: string, targetNoteId: string, isInheritable?: boolean): Relation;
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
    searchNotesInSubtree(searchString: string): any[];
    searchNoteInSubtree(searchString: string): any;
    cloneTo(parentNoteId: any): any;
    isEligibleForConversionToAttachment(): boolean;
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
    convertToParentAttachment({autoConversion}?: {autoConversion: boolean}): Attachment | null;
    /**
     * (Soft) delete a note and all its descendants.
     * @param [deleteId = null] - optional delete identified
     */
    deleteNote(deleteId?: string, taskContext?: TaskContext): void;
    decrypt(): void;
    isLauncherBarConfig(): boolean;
    isOptions(): boolean;
    readonly isDeleted: boolean;
    saveRevision(): Revision | null;
    saveAttachment(): Attachment;
    getFileName(): string;
}