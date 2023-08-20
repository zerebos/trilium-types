import {Editor} from "codemirror";
import {BalloonEditor} from "@ckeditor/ckeditor5-editor-balloon";

import {Component} from "../component";
import {LoadResults} from "../loadresults";
import {TypeWidget} from "../widgets";

import {Note} from "./note";


interface PojoState {
    ntxId: string,
    mainNtxId: string,
    notePath: string,
    hoistedNoteId: string,
    active: boolean,
    viewScope: object
}

interface ViewScope {
    viewMode?: "default" | "source";
    readOnlyTemporarilyDisabled?: boolean;
    attachmentId?: string;
}

export interface NoteContext extends Component {
    new(ntxId?: string, hoistedNoteId?: string, mainNtxId?: string | null): NoteContext;
    readonly ntxId: string;
    readonly hoisedNoteId: string;
    readonly mainNtxId: string;
    readonly viewScope: ViewScope;
    readonly note: Note | null;
    readonly notePathArray: string[];
    generateNtxId(): string;
    setEmpty(): void;
    isEmpty(): boolean;
    setNote(inputNotePath: string, opts?: object): Promise<void>;
    getSubContexts(): NoteContext[];
    isMainContext(): boolean;
    getMainContext(): NoteContext;
    saveToRecentNotes(resolvedNotePath: string): void;
    getResolvedNotePath(inputNotePath: string): Promise<string | undefined>;
    isActive(): boolean;
    getPojoState(): PojoState;
    unhoist(): Promise<void>;
    setHoistedNoteId(noteIdToHoist: string): Promise<void>;
    isReadOnly(): Promise<boolean>;
    entitiesReloadedEvent({loadResults}: {loadResults: LoadResults}): Promise<void>;
    hasNoteList(): boolean;
    getTextEditor(callback: CallableFunction): Promise<BalloonEditor>;
    getCodeEditor(): Promise<Editor>;
    getContentElement(): Promise<HTMLElement>;
    getTypeWidget(): Promise<TypeWidget>
    resetViewScope(): void;
    getNavigationTitle(): string;
}