import {NoteType, integer} from "../../common";
import {AbstractBeccaEntity} from "./base";
import {Attachment} from "./attachment";
import {Note} from "./note";


interface RevisionPojo {
    revisionId: string;
    noteId: string;
    type: NoteType;
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
}

export interface Revision extends AbstractBeccaEntity<RevisionPojo>, RevisionPojo {
    readonly entityName: "revisions";
    readonly primaryKeyName: "revisionId";
    readonly hashedProperties: ["revisionId", "noteId", "title", "isProtected", "dateLastEdited", "dateCreated",
                                "utcDateLastEdited", "utcDateCreated", "utcDateModified", "blobId"];
    new(row: RevisionPojo, titleDecrypted?: boolean): Revision;

    getNote(): Note;
    /**
     * @returns true if the note has string content (not binary)
     */
    hasStringContent(): boolean;
    isContentAvailable(): boolean;
    getContent(): string | Buffer;
    /**
     * @param [opts.forceSave = false] - will also save this BRevision entity
     */
    setContent(content: string, opts?: {forceSave?: boolean;}): void;
    getAttachments(): Attachment[];
}