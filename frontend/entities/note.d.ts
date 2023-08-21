import {Froca} from "../froca";
import {Attachment} from "./attachment";
import {Branch} from "./branch";
import {Blob} from "./blob";
import {Attribute, Label, Relation} from "./attribute";
import {NoteType, NotePathRecord, ScriptEnvironment} from "../../common";


type BranchPath = Record<string, string>;

export interface NotePojo {
    noteId: string;
    title: string;
    isProtected: boolean;
    /**
     * one of 'text', 'code', 'file' or 'render'
     */
    type: NoteType;
    /**
     * content-type, e.g. "application/json"
     */
    mime: string;
}

export interface Note extends NotePojo {
    new(froca: Froca, row: NotePojo): Note;
    froca: Froca;
    attributes: string[];
    targetRelations: string[];
    parents: string[];
    children: string[];
    parentToBranch: BranchPath;
    childToBranch: BranchPath;
    attachments?: Attachment[];
    update(row: NotePojo): void;
    addParent(parentNoteId: string, branchId: string, sort?: boolean): void;
    addChild(childNoteId: string, brachId: string, sort?: boolean): void;
    sortChildren(): void;
    isJson(): boolean;
    getContent(): Promise<string>;
    getParentBranchIds(): string[];
    /**
     * @deprecated use getParentBranchIds()
     */
    getBranchIds(): string[];
    getParentBranches(): Branch[];
    /**
     * @deprecated use getParentBranches()
     */
    getBranches(): Branch[];
    hasChildren(): boolean;
    getChildBranches(): Branch[];
    getParentNoteIds(): string[];
    getParentNotes(): Note[];
    sortParent(): void;
    readonly isArchived: boolean;
    getChildNoteIds(): string[];
    getChildNotes(): Promise<Note[]>;
    getAttachments(): Promise<Attachment[]>;
    getAttachmentById(): Promise<Attachment>;
    isEligibleForConversionToAttachment(): boolean;
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
    isRoot(): boolean;
    /**
     * Gives all possible note paths leading to this note. Paths containing search note are ignored (could form cycles)
     * @returns - array of notePaths (each represented by array of noteIds constituting the particular note path)
     */
    getAllNotePaths(): string[][];
    getSortedNotePathRecords(hoistedNoteId?: string): NotePathRecord[];
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
    isHiddenCompletely(): boolean;
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), including inherited ones
     */
    getOwnedLabels(name?: string): Attribute[];
    /**
     * @param [name] - label name to filter
     * @returns all note's labels (attributes with type label), including inherited ones
     */
    getLabels(name?: string): Label[];
    /**
     * @returns {string} icon class for note
     */
    getIcon(): string;
    /**
     * @returns {string} color class label value
     */
    getColorClass(): string;
    /**
     * @returns {boolean} true when this nolte has child notes
     */
    isFolder(): boolean;
    getFilteredChildBranches(): Branch[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), including inherited ones
     */
    getOwnedRelations(name?: string): Relation[];
    /**
     * @param [name] - relation name to filter
     * @returns all note's relations (attributes with type relation), including inherited ones
     */
    getRelations(name?: string): Relation[];
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
    getOwnedAttribute(type: string, name: string): Attribute | null;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute of the given type and name. If there are more such attributes, first is returned. Returns null if there's no such attribute belonging to this note.
     */
    getAttribute(type: string, name: string): Attribute | null;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute value of the given type and name or null if no such attribute exists.
     */
    getOwnedAttributeValue(type: string, name: string): string | null;
    /**
     * @param type - attribute type (label, relation, etc.)
     * @param name - attribute name
     * @returns attribute value of the given type and name or null if no such attribute exists.
     */
    getAttributeValue(type: string, name: string): string | null;
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
    getOwnedLabel(name: string): Label | null;
    /**
     * @param name - label name
     * @returns label if it exists, null otherwise
     */
    getLabel(name: string): Label | null;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getOwnedRelation(name: string): Relation | null;
    /**
     * @param name - relation name
     * @returns relation if it exists, null otherwise
     */
    getRelation(name: string): Relation | null;
    /**
     * @param name - label name
     * @returns label value if label exists, null otherwise
     */
    getOwnedLabelValue(name: string): string | null;
    /**
     * @param name - label name
     * @returns label value if label exists, null otherwise
     */
    getLabelValue(name: string): string | null;
    /**
     * @param name - relation name
     * @returns relation value if relation exists, null otherwise
     */
    getOwnedRelationValue(name: string): string | null;
    /**
     * @param name - relation name
     * @returns relation value if relation exists, null otherwise
     */
    getRelationValue(name: string): string | null;
    /**
     * @returns target note of the relation or null (if target is empty or note was not found)
     */
    getRelationTarget(name: string): Promise<Note> | null;
    /**
     * @param [name] - relation name to filter
     */
    getRelationTargets(name?: string): Promise<Note[]>;
    getNotesToInheritAttributesFrom(): Note[];
    getPromotedDefinitionAttributes(): Attribute[];
    hasAncestor(ancestorNoteId: string, followTemplate?: boolean, visitedNoteIds?: string[]): boolean;
    isInHiddenSubtree(): boolean;
    // Intentionally commented out since it is deprecated and does not do anything (NOOP)
    // invalidateAttributeCache(): void;
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
    toString(): string;
    readonly dto: Omit<{} & this, "froca">;
    getCssClass(): string;
    getWorkspaceIconClass(): string;
    getWorkspaceTabBackgroundColor(): string;
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
    getScriptEnv(): ScriptEnvironment | null;
    executeScript(): Promise<void>;
    isShared(): boolean;
    isContentAvailable(): boolean;
    isLaunchBarConfig(): boolean;
    isOptions(): boolean;
}