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