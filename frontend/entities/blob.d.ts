import {integer} from "../../common";


export interface BlobPojo {
    blobId: string;
    /**
     * can either contain the whole content (in e.g. string notes), only part (large text notes) or nothing at all (binary notes, images)
     */
    content: string;
    contentLength: integer;
    dateModified: string;
    utcDateModified: string;
}

export interface Blob extends BlobPojo {
    // new(row: BlobPojo): Blob;
    getJsonContent(): object|null;
    getJsonContentSafely(): object|null;
}