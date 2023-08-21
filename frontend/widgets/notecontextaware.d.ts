import {Note} from "../entities/note";
import {NoteContext} from "../entities/context";

import {BasicWidget} from "./basic";


export class NoteContextAwareWidget extends BasicWidget {
    new(): NoteContextAwareWidget;
    readonly note?: Note;
    readonly noteId?: string;
    readonly notePath?: string[];
    readonly hoistedNoteId: string;
    readonly ntxId: string;
    readonly noteContext: NoteContext;
    isNoteContext(ntxId: string | ReadonlyArray<string>): boolean;
    isActiveNoteContext(): boolean;
    isNote(noteId: string): boolean;
    isEnabled(): boolean;
    refresh(): Promise<void>;
    refreshWithNote(note: Note): Promise<void>;
    noteSwitchedEvent({noteContext, notePath}: {noteContext: NoteContext, notePath: ReadonlyArray<string>}): Promise<void>;
    noteSwitched(): Promise<void>;
    activeContextChangedEvent({noteContext}: {noteContext: NoteContext}): Promise<void>;
    activeContextChanged(): Promise<void>;
    noteSwitchedAndActivatedEvent({noteContext, notePath}: {noteContext: NoteContext, notePath: ReadonlyArray<string>}): Promise<void>;
    setNoteContextEvent({noteContext}: {noteContext: NoteContext}): void;
    noteTypeMimeChangedEvent({noteId}: {noteId: string}): Promise<void>;
    frocaReloadedEvent(): Promise<void>;
}