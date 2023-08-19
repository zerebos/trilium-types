import {integer} from "../../common";

import {Froca} from "./froca";
import {Blob} from "./blob";
import {Note} from "./note";


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