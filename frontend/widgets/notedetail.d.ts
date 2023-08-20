import {NoteContext} from "../notes/context";

import {NoteContextAwareWidget} from "./notecontextaware";
import {TypeWidget} from "./type";


export class NoteDetailWidget extends NoteContextAwareWidget {
    typeWidgets: Record<string, TypeWidget>;
    spacedUpdate: unknown;
    checkFullHeight(): void;
    getTypeWidget(): TypeWidget;
    focusOnDetailEvent({ntxId}: {ntxId: string}): Promise<void>;
    scrollToEndEvent({ntxId}: {ntxId: string}): Promise<void>;
    beforeNoteSwitchEvent({noteContext}: {noteContext: NoteContext}): Promise<void>;
    beforeNoteContextRemoveEventt({noteContext}: {noteContext: NoteContext}): Promise<void>;
    runActiveNoteCommand(params: {ntxId: string}): Promise<any>;
    printActiveNoteEvent(): Promise<void>;
    hoistedNoteChangedEvent({ntxId}: {ntxId: string}): void;
    beforeUnloadEvent(): void;
    readOnlyTemporarilyDisabledEvent({noteContext}: {noteContext: NoteContext}): void;
    executeInActiveNoteDetailWidgetEvent({callback}: {callback: CallableFunction}): Promise<void>;
    cutIntoNoteCommand(): Promise<void>;
    saveNoteDetailNowCommand(): Promise<void>;
    renderActiveNoteEvent(): void;
    executeWithTypeWidgetEvent({resolve, ntxId}: {resolve: CallableFunction, ntxId: string}): Promise<void>;
}