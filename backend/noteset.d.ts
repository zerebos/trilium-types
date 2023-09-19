import {Note} from "./entities";

export declare class NoteSet {
    constructor(notes: Note[]);
    notes: Note[];
    noteIdSet: Set<string>;
    sorted: boolean;
    add(note: Note): void;
    addAll(notes: Note[]): void;
    hasNote(note: Note): boolean;
    hasNoteId(noteId: string): boolean;
    mergeIn(anotherNoteSet: NoteSet): void;
    minus(anotherNoteSet: NoteSet): NoteSet;
    intersection(anotherNoteSet: NoteSet): NoteSet;
}
