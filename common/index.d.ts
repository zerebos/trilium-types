/**
 * Alias of number to show we want whole numbers.
 */
export type integer = number;

export type LabelAttributeType = "label";
export type RelationAttributeType = "relation";
export type AttributeType = LabelAttributeType | RelationAttributeType;

export type NoteType = "file" | "image" | "search" | "noteMap" | "launcher" |
                       "doc" | "contentWidget" | "text" | "relationMap" |
                       "render" | "canvas" | "mermaid" | "book" | "webView" | "code";
export type ScriptEnvironment = "frontend" | "backend" | null;

export interface NotePathRecord {
    isArchived: boolean;
    isInHoistedSubTree: boolean;
    isSearch?: boolean;
    notePath: string[];
    isHidden: boolean;
}

export type LauncherType = "note" | "script" | "customWidget";
export type BlobEntityType = "notes" | "attachments";
export type TaskType = "deleteNotes" | "undeleteNotes" | "importNotes" | "importAttachments" | "protectNotes" | "export"