import {integer} from "../../common";
import {AbstractBeccaEntity} from "./base";
import {Note} from "./note";
import {Branch} from "./branch";


interface AttachmentPojo {
    attachmentId: string;
    /**
     * either noteId or revisionId to which this attachment belongs
     */
    ownerId: string;
    role: string;
    mime: string;
    title: string;
    position: integer;
    blobId: string;
    isProtected: boolean;
    isDeleted?: boolean;
    dateModified: string;
    utcDateModified: string;
    utcDateScheduledForErasureSince: string;
    /**
     * optionally added to the entity
     */
    contentLength?: integer;
}


export interface Attachment extends AbstractBeccaEntity<AttachmentPojo>, AttachmentPojo {
    readonly entityName: "attachments";
    readonly primaryKeyName: "attachmentId";
    readonly hashedProperties: ["attachmentId", "ownerId", "role", "mime", "title", "blobId",
                       "utcDateScheduledForErasureSince", "utcDateModified"];
    // new(row: AttachmentPojo): Attachment;
    copy(): Attachment;
    getNote(): Note;
    /**
     * @returns true if the note has string content (not binary)
     */
    hasStringContent(): boolean;
    isContentAvailable(): boolean;
    getTitleOrProtected(): string;
    decrypt(): void;
    getContent(): string | Buffer;
    /**
     * @param [opts.forceSave = false] - will also save this BAttachment entity
     * @param [opts.forceFrontendReload = false] - override frontend heuristics on when to reload, instruct to reload
     */
    setContent(content: string | Buffer, opts?: {
        forceSave?: boolean;
        forceFrontendReload?: boolean;
    }): void;
    convertToNote(): {note: Note, branch: Branch};
    getFilename(): string;
}