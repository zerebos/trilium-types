import {integer} from "../../common";
import {AbstractBeccaEntity} from "./base";


interface BlobPojo {
    blobId: string;
    content: string;
    contentLength: integer;
    dateModified: string;
    utcDateModified: string;
}

export interface Blob extends AbstractBeccaEntity<BlobPojo>, BlobPojo {
    readonly entityName: "blobs";
    readonly primaryKeyName: "blobId";
    readonly hashedProperties: ["blobId", "content"];
    // new(row: BlobPojo): Blob;
}