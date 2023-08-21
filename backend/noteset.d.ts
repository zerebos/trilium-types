import {Note} from "./entities";

export interface NoteSet {
    notes: Note[];
    noteIdSet: Set<string>;
    sorted: boolean;
    new(notes: Note[]): NoteSet;
    add(note: Note): void;
    addAll(notes: Note[]): void;
    hasNote(note: Note): boolean;
    hasNoteId(noteId: string): boolean;
    mergeIn(anotherNoteSet: NoteSet): void;
    minus(anotherNoteSet: NoteSet): NoteSet;
    intersection(anotherNoteSet: NoteSet): NoteSet;
}
