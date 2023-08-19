import {integer} from "../common";
import {Component} from "./component";
import {LoadResults} from "./loadresults";
import {Note, NoteContext} from "./notes";


interface attrs {
    readonly style: string;
}

export class BasicWidget extends Component {
    readonly attrs: attrs;
    readonly classes: string[];
    readonly children: Component[];
    readonly childPositionCounter: integer;
    readonly cssEl: string;
    $widget: JQuery;
    child(...components: Component[]): this;
    id(id: string): this;
    class(className: string): this;
    css(name: string, value: string): this;
    contentSized(): this;
    collapsible(): this;
    filling(): this;
    cssBlock(block: string): this;
    render(): JQuery;
    isEnabled(): boolean;
    /**
     * This is for overriding.
     */
    doRender(): void;
    toggleInt(show: boolean): void;
    isHiddenInt(): boolean;
    toggleExt(show: boolean): void;
    isHiddenExt(): boolean;
    canBeShown(): boolean;
    isVisible(): boolean;
    getPosition(): integer;
    remove(): void;
    getClosestNtxId(): string|null;
    cleanup(): void;
    entitiesReloadedEvent?({loadResults}: {loadResults: LoadResults}): Promise<void>;
}


export class NoteContextAwareWidget extends BasicWidget {
    new(): NoteContextAwareWidget;
    readonly note: Note|undefined;
    readonly noteId: string|undefined;
    readonly notePath: string[]|undefined;
    readonly hoistedNoteId: string;
    readonly ntxId: string;
    readonly noteContext: NoteContext;
    isNoteContext(ntxId: string|string[]): boolean;
    isActiveNoteContext(): boolean;
    isNote(noteId: string): boolean;
    isEnabled(): boolean;
    refresh(): Promise<void>;
    refreshWithNote(note: Note): Promise<void>;
    noteSwitchedEvent({noteContext, notePath}: {noteContext: NoteContext, notePath: string[]}): Promise<void>;
    noteSwitched(): Promise<void>;
    activeContextChangedEvent({noteContext}: {noteContext: NoteContext}): Promise<void>;
    activeContextChanged(): Promise<void>;
    noteSwitchedAndActivatedEvent({noteContext, notePath}: {noteContext: NoteContext, notePath: string[]}): Promise<void>;
    setNoteContextEvent({noteContext}: {noteContext: NoteContext}): void;
    noteTypeMimeChangedEvent({noteId}: {noteId: string}): Promise<void>;
    frocaReloadedEvent(): Promise<void>;
}


export class NoteDetailWidget extends NoteContextAwareWidget {
    typeWidgets: {[key: string]: TypeWidget};
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


export class RightPanelWidget extends NoteContextAwareWidget {
    widgetTitle: string;
    help: object;
    readonly $title: JQuery;
    readonly $body: JQuery;
    readonly $bodyWrapper: JQuery;
    /**
     * Don't override this one
     */
    doRender(): void;
    /**
     * This is the one to override.
     */
    doRenderBody(): Promise<any>;
}


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