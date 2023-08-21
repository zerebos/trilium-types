import {AbstractBeccaEntity} from "./base";


interface TokenPojo {
    etapiTokenId: string;
    name: string;
    tokenHash: string;
    utcDateCreated: string;
    utcDateModified: string;
    isDeleted?: boolean;
}

export interface ETAPIToken extends AbstractBeccaEntity<TokenPojo>, TokenPojo {
    readonly entityName: "etapi_tokens";
    readonly primaryKeyName: "etapiTokenId";
    readonly hashedProperties: ["etapiTokenId", "name", "tokenHash", "utcDateCreated", "utcDateModified", "isDeleted"];
    new(row: TokenPojo): ETAPIToken;
    updateFromRow(row: TokenPojo): void;
    init(): void;
}