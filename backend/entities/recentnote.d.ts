import {AbstractBeccaEntity} from "./base";


interface RecentNotePojo {
    noteId: string;
    notePath: string;
    utcDateCreated: string;
}

export interface RecentNote extends AbstractBeccaEntity<RecentNotePojo>, RecentNotePojo {
    readonly entityName: "recent_notes";
    readonly primaryKeyName: "noteId";
    // new(row: RecentNotePojo): RecentNote;

}