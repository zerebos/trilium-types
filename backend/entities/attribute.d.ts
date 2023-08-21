import {integer} from "../../common";
import {AbstractBeccaEntity} from "./base";
import {Note} from "./note";


export class Attribute extends AbstractBeccaEntity {
    attributeId: string;
    noteId: string;
    type: string;
    name: string;
    position: integer
    value: string;
    isInheritable: boolean;
    utcDateModified: string;
    getNote(): Note | null;
    getTargetNote(): Note | null;
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