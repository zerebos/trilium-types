import {Note} from "../entities/note";
import {NoteContext} from "../entities/context";

import {NoteContextAwareWidget} from "./notecontextaware";


export class TypeWidget extends NoteContextAwareWidget {
    /**
     * Used for overriding
     */
    getType(): void;
    doRender(): void;
    doRefresh(note: Note): Promise<void>;
    isActive(): boolean;
    focus(): void;
    readOnlyTemporarilyDisabledEvent({noteContext}: {noteContext: NoteContext}): Promise<void>;
}