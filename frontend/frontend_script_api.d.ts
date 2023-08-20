import dayjs from "dayjs";
import CodeMirror from "codemirror";
import {BalloonEditor} from "@ckeditor/ckeditor5-editor-balloon";
import {integer} from "../common";
import {Note} from "./notes/note";
import {Component} from "./component";
import {BasicWidget} from "./widgets/basic";
import {NoteDetailWidget} from "./widgets/notedetail";
import {RightPanelWidget} from "./widgets/rightpanel";
import {NoteContextAwareWidget} from "./widgets/notecontextaware";

declare global {
    const api: FrontendScriptApi;
}

// type NotePath = string;
// type NoteID = string;

type ISODateFormat = `${number}-${number}-${number}`;  // 'YYYY-MM-DD'
type MonthFormat = `${number}-${number}`;  // 'YYYY-MM-DD'


/**
 * <p>This is the main frontend API interface for scripts. All the properties and methods are published in the "api" object
 * available in the JS frontend notes. You can use e.g. <code>api.showMessage(api.startNote.title);</code></p>
 */
export default class FrontendScriptApi {
    new(startNote: Note, currentNote: Note, originEntity?: any, $container?: JQuery): FrontendScriptApi;
    /**
     * Container of all the rendered script content
     */
    $container: JQuery;
    /**
     * Note where the script started executing
     */
    startNote: Note;
    /**
     * Note where the script is currently executing
     */
    currentNote: Note;
    /**
     * Entity whose event triggered this execution
     */
    originEntity: any | null;
    /**
     * day.js library for date manipulation.
     * See {@link https://day.js.org} for documentation
     */
    dayjs: typeof dayjs;
    RightPanelWidget: typeof RightPanelWidget;
    NoteContextAwareWidget: typeof NoteContextAwareWidget;
    BasicWidget: typeof BasicWidget;
    /**
     * Activates note in the tree and in the note detail.
     * @param notePath - (or noteId)
     */
    activateNote(notePath: string): Promise<void>;
    /**
     * Activates newly created note. Compared to this.activateNote() also makes sure that frontend has been fully synced.
     * @param notePath - (or noteId)
     */
    activateNewNote(notePath: string): Promise<void>;
    /**
     * Open a note in a new tab.
     * @param notePath - (or noteId)
     * @param activate - set to true to activate the new tab, false to stay on the current tab
     */
    openTabWithNote(notePath: string, activate: boolean): Promise<void>;
    /**
     * Open a note in a new split.
     * @param notePath - (or noteId)
     * @param activate - set to true to activate the new split, false to stay on the current split
     */
    openSplitWithNote(notePath: string, activate: boolean): Promise<void>;
    /**
     * Adds a new launcher to the launchbar. If the launcher (id) already exists, it will be updated.
     * @param opts.action - callback handling the click on the button
     * @param [opts.id] - id of the button, used to identify the old instances of this button to be replaced
     *                          ID is optional because of BC, but not specifying it is deprecated. ID can be alphanumeric only.
     * @param [opts.icon] - name of the boxicon to be used (e.g. "time" for "bx-time" icon)
     * @param [opts.shortcut] - keyboard shortcut for the button, e.g. "alt+t"
     * @deprecated you can now create/modify launchers in the top-left Menu -> Configure Launchbar
     *             for special needs there's also backend API's createOrUpdateLauncher()
     */
    addButtonToToolbar(opts: {
        title: string;
        action: (...params: any[]) => any;
        id?: string;
        icon?: string;
        shortcut?: string;
    }): void;
    /**
     * Executes given anonymous function on the backend.
     * Internally this serializes the anonymous function into string and sends it to backend via AJAX.
     * @param script - script to be executed on the backend
     * @param params - list of parameters to the anonymous function to be sent to backend
     * @returns return value of the executed function on the backend
     */
    runOnBackend<Func extends (...args: any[]) => any>(script: Func, params: Parameters<Func>): Promise<ReturnType<Func>>;
    /**
     * This is a powerful search method - you can search by attributes and their values, e.g.:
     * "#dateModified =* MONTH AND #log". See full documentation for all options at: https://github.com/zadam/trilium/wiki/Search
     */
    searchForNotes(searchString: string): Promise<Note[]>;
    /**
     * This is a powerful search method - you can search by attributes and their values, e.g.:
     * "#dateModified =* MONTH AND #log". See full documentation for all options at: https://github.com/zadam/trilium/wiki/Search
     */
    searchForNote(searchString: string): Promise<Note | null>;
    /**
     * Returns note by given noteId. If note is missing from the cache, it's loaded.
     * *
     */
    getNote(noteId: string): Promise<Note>;
    /**
     * Returns list of notes. If note is missing from the cache, it's loaded.
     *
     * This is often used to bulk-fill the cache with notes which would have to be picked one by one
     * otherwise (by e.g. createLink())
     * @param [silentNotFoundError] - don't report error if the note is not found
     */
    getNotes(noteIds: string[], silentNotFoundError?: boolean): Promise<Note[]>;
    /**
     * Update frontend tree (note) cache from the backend.
     */
    reloadNotes(noteIds: string[]): void;
    /**
     * Instance name identifies particular Trilium instance. It can be useful for scripts
     * if some action needs to happen on only one specific instance.
     */
    getInstanceName(): string;
    /**
     * @returns date in YYYY-MM-DD format
     */
    formatDateISO(date: Date): ISODateFormat;
    /**
     * @returns parsed object
     */
    parseDate(str: string): Date;
    /**
     * Show an info message to the user.
     */
    showMessage(message: string): void;
    /**
     * Show an error message to the user.
     */
    showError(message: string): void;
    /**
     * Trigger command. This is a very low-level API which should be avoided if possible.
     */
    triggerCommand(name: string, data: any): void;
    /**
     * Trigger event. This is a very low-level API which should be avoided if possible.
     */
    triggerEvent(name: string, data: any): void;
    
    /**
     * Create a note link (jQuery object) for given note.
     * @param notePath - (or noteId)
     * @param [params.showTooltip = true] - enable/disable tooltip on the link
     * @param [params.showNotePath = false] - show also whole note's path as part of the link
     * @param [params.showNoteIcon = false] - show also note icon before the title
     * @param [params.title] - custom link tile with note's title as default
     */
    createLink(notePath: string, params?: {
        showTooltip?: boolean;
        showNotePath?: boolean;
        showNoteIcon?: boolean;
        title?: string;
    }): void;

    /**
     * Create a note link (jQuery object) for given note.
     * @param notePath - (or noteId)
     * @param [params.showTooltip = true] - enable/disable tooltip on the link
     * @param [params.showNotePath = false] - show also whole note's path as part of the link
     * @param [params.showNoteIcon = false] - show also note icon before the title
     * @param [params.title] - custom link tile with note's title as default
     * @deprecated - use createLink
     */
    createNoteLink: typeof this.createLink;
    /**
     * Adds given text to the editor cursor
     * @param text - this must be clear text, HTML is not supported.
     */
    addTextToActiveContextEditor(text: string): void;
    /**
     * @returns active note (loaded into right pane)
     */
    getActiveContextNote(): Note;
    /**
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html for documentation on the returned instance.
     * @returns instance of CKEditor
     */
    getActiveContextTextEditor(): Promise<BalloonEditor>;
    /**
     * See https://codemirror.net/doc/manual.html#api
     * @returns instance of CodeMirror
     */
    getActiveContextCodeEditor(): Promise<typeof CodeMirror>;
    /**
     * Get access to the widget handling note detail. Methods like `getWidgetType()` and `getTypeWidget()` to get to the
     * implementation of actual widget type.
     */
    getActiveNoteDetailWidget(): Promise<typeof NoteDetailWidget>;
    /**
     * @returns returns a note path of active note or null if there isn't active note
     */
    getActiveContextNotePath(): Promise<string | null>;
    /**
     * Returns component which owns the given DOM element (the nearest parent component in DOM tree)
     * @param el - DOM element
     */
    getComponentByEl(el: Element): Component;
    /**
     * @param $el - jquery object on which to set up the tooltip
     */
    setupElementTooltip($el: JQuery): Promise<void>;
    /**
     * @param protect - true to protect note, false to unprotect
     */
    protectNote(noteId: string, protect: boolean): Promise<void>;
    /**
     * @param protect - true to protect subtree, false to unprotect
     */
    protectSubTree(noteId: string, protect: boolean): Promise<void>;
    /**
     * Returns date-note for today. If it doesn't exist, it is automatically created.
     */
    getTodayNote(): Promise<Note>;
    /**
     * Returns day note for a given date. If it doesn't exist, it is automatically created.
     * @param date - e.g. "2019-04-29"
     */
    getDayNote(date: ISODateFormat): Promise<Note>;
    /**
     * Returns day note for the first date of the week of the given date. If it doesn't exist, it is automatically created.
     * @param date - e.g. "2019-04-29"
     */
    getWeekNote(date: ISODateFormat): Promise<Note>;
    /**
     * Returns month-note. If it doesn't exist, it is automatically created.
     * @param month - e.g. "2019-04"
     */
    getMonthNote(month: MonthFormat): Promise<Note>;
    /**
     * Returns year-note. If it doesn't exist, it is automatically created.
     * @param year - e.g. "2019"
     */
    getYearNote(year: string | number): Promise<Note>;
    /**
     * Hoist note in the current tab. See https://github.com/zadam/trilium/wiki/Note-hoisting
     * @param noteId - set hoisted note. 'root' will effectively unhoist
     */
    setHoistedNoteId(noteId: string): Promise<void>;
    /**
     * @param keyboardShortcut - e.g. "ctrl+shift+a"
     * @param [namespace] - specify namespace of the handler for the cases where call for bind may be repeated.
     *                               If a handler with this ID exists, it's replaced by the new handler.
     */
    bindGlobalShortcut<Func extends (...args: any[]) => any>(keyboardShortcut: string, handler: Func, namespace?: string): Promise<void>;
    /**
     * Trilium runs in a backend and frontend process, when something is changed on the backend from a script,
     * frontend will get asynchronously synchronized.
     *
     * This method returns a promise which resolves once all the backend -> frontend synchronization is finished.
     * Typical use case is when a new note has been created, we should wait until it is synced into frontend and only then activate it.
     */
    waitUntilSynced(): Promise<void>;
    /**
     * This will refresh all currently opened notes which have included note specified in the parameter
     * @param includedNoteId - noteId of the included note
     */
    refreshIncludedNote(includedNoteId: string): Promise<void>;
    /**
     * Return randomly generated string of given length. This random string generation is NOT cryptographically secure.
     * @param length - of the string
     * @returns random string
     */
    randomString(length: integer): string;
    /**
     * @param size - in bytes
     * @returns formatted string
     */
    formatSize(size: integer): string;
    /**
     * @param size - in bytes
     * @returns formatted string
     * @deprecated - use formatSize()
     */
    formatNoteSize(size: integer): string;
    /**
     * Log given message to the log pane in UI
     */
    log(message: any): void;
}