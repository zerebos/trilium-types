import {integer} from "../../common";

import {Froca} from "./froca";
import {Blob} from "./blob";
import {Note} from "./note";


export interface AttachmentPojo {
    attachmentId: string;
    ownerId: string;
    role: string;
    mime: string;
    title: string;
    dateModified: string;
    utcDateModified: string;
    utcDateScheduledForErasureSince: string;
    contentLength?: integer;
}

export interface Attachment extends AttachmentPojo {
    new(froca: Froca, row: AttachmentPojo): Attachment;
    froca: Froca;
    update(row: AttachmentPojo): void;
    getNote(): Note;
    getBlob(): Blob;
}