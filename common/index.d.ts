/**
 * Alias of number to show we want whole numbers.
 */
export type integer = number;

export type LabelAttributeType = "label";
export type RelationAttributeType = "label";
export type AttributeType = LabelAttributeType | RelationAttributeType

export type NoteType = "text" | "code" | "file" | "render";
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