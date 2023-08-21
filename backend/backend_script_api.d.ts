import dayjs from "dayjs";
import {integer} from "../common";
import {Axios} from "axios";
import * as xmljs from "xml2js";

import {AbstractBeccaEntity} from "./entities/base";
import {Note} from "./entities/note";
import {Branch} from "./entities/branch";
import {Attribute} from "./entities/attribute";

import {SQL} from "./sql";


/**
 * <p>This is the main backend API interface for scripts. All the properties and methods are published in the "api" object
 * available in the JS backend notes. You can use e.g. <code>api.log(api.startNote.title);</code></p>
 */
export default class BackendScriptApi {
    constructor();
    /**
     * Note where the script started executing
     */
    startNote: Note;
    /**
     * Note where the script is currently executing. Don't mix this up with the concept of active note
     */
    currentNote: Note;
    /**
     * Entity whose event triggered this execution
     */
    originEntity: AbstractBeccaEntity;
    /**
     * Axios library for HTTP requests. See {@link https://axios-http.com} for documentation
     */
    axios: typeof Axios;
    /**
     * day.js library for date manipulation. See {@link https://day.js.org} for documentation
     */
    dayjs: typeof dayjs;
    /**
     * xml2js library for XML parsing. See {@link https://github.com/Leonidas-from-XIV/node-xml2js} for documentation
     */
    xml2js: typeof xmljs;
    /**
     * Instance name identifies particular Trilium instance. It can be useful for scripts
     * if some action needs to happen on only one specific instance.
     */
    getInstanceName(): string | null;
    getNote(noteId: string): Note | null;
    getBranch(branchId: string): Branch | null;
    getAttribute(attributeId: string): Attribute | null;
    /**
     * This is a powerful search method - you can search by attributes and their values, e.g.:
     * "#dateModified =* MONTH AND #log". See {@link https://github.com/zadam/trilium/wiki/Search} for full documentation for all options
     */
    searchForNotes(query: string, searchParams?: any): Note[];
    /**
     * This is a powerful search method - you can search by attributes and their values, e.g.:
     * "#dateModified =* MONTH AND #log". See {@link https://github.com/zadam/trilium/wiki/Search} for full documentation for all options
     */
    searchForNote(query: string, searchParams?: any): Note | null;
    /**
     * Retrieves notes with given label name & value
     * @param name - attribute name
     * @param [value] - attribute value
     */
    getNotesWithLabel(name: string, value?: string): Note[];
    /**
     * Retrieves first note with given label name & value
     * @param name - attribute name
     * @param [value] - attribute value
     */
    getNoteWithLabel(name: string, value?: string): Note | null;
    /**
     * If there's no branch between note and parent note, create one. Otherwise, do nothing. Returns the new or existing branch.
     * @param prefix - if branch is created between note and parent note, set this prefix
     */
    ensureNoteIsPresentInParent(noteId: string, parentNoteId: string, prefix: string): any;
    /**
     * If there's a branch between note and parent note, remove it. Otherwise, do nothing.
     */
    ensureNoteIsAbsentFromParent(noteId: string, parentNoteId: string): void;
    /**
     * Based on the value, either create or remove branch between note and parent note.
     * @param present - true if we want the branch to exist, false if we want it gone
     * @param prefix - if branch is created between note and parent note, set this prefix
     */
    toggleNoteInParent(present: boolean, noteId: string, parentNoteId: string, prefix: string): void;
    /**
     * Create text note. See also createNewNote() for more options.
     * @returns - object having "note" and "branch" keys representing respective objects
     */
    createTextNote(parentNoteId: string, title: string, content: string): any;
    /**
     * Create data note - data in this context means object serializable to JSON. Created note will be of type 'code' and
     * JSON MIME type. See also createNewNote() for more options.
     * @returns object having "note" and "branch" keys representing respective objects
     */
    createDataNote(parentNoteId: string, title: string, content: any): any;
    /**
     * @param params.type - text, code, file, image, search, book, relationMap, canvas
     * @param [params.mime] - value is derived from default mimes for type
     * @param [params.notePosition] - default is last existing notePosition in a parent + 10
     * @returns object contains newly created entities note and branch
     */
    createNewNote(params: {
        parentNoteId: string;
        title: string;
        content: string | Buffer;
        type: string;
        mime?: string;
        isProtected?: boolean;
        isExpanded?: boolean;
        prefix?: string;
        notePosition?: integer;
    }): any;
    /**
     * @param parentNoteId - create new note under this parent
     * @param [extraOptions.json = false] - should the note be JSON
     * @param [extraOptions.isProtected = false] - should the note be protected
     * @param [extraOptions.type = 'text'] - note type
     * @param [extraOptions.mime = 'text/html'] - MIME type of the note
     * @param [extraOptions.attributes = []] - attributes to be created for this note
     * @param extraOptions.attributes.type - attribute type - label, relation etc.
     * @param extraOptions.attributes.name - attribute name
     * @param [extraOptions.attributes.value] - attribute value
     * @returns object contains newly created entities note and branch
     */
    createNote(parentNoteId: string, title: string, content?: string, extraOptions?: {
        json?: boolean;
        isProtected?: boolean;
        type?: string;
        mime?: string;
        attributes?: {
            type: string;
            name: string;
            value?: string;
        }[];
    }): any;
    /**
     * Log given message to trilium logs and log pane in UI
     */
    log(message: any): void;
    /**
     * Returns root note of the calendar.
     */
    getRootCalendarNote(): Note | null;
    /**
     * Returns day note for given date. If such note doesn't exist, it is created.
     * @param date - in YYYY-MM-DD format
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getDayNote(date: string, rootNote?: Note): Note | null;
    /**
     * Returns today's day note. If such note doesn't exist, it is created.
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getTodayNote(rootNote?: Note): Note | null;
    /**
     * Returns note for the first date of the week of the given date.
     * @param date - in YYYY-MM-DD format
     * @param [options.startOfTheWeek = monday] - either "monday" (default) or "sunday"
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getWeekNote(date: string, options?: {
        startOfTheWeek?: string;
    }, rootNote?: Note): Note | null;
    /**
     * Returns month note for given date. If such note doesn't exist, it is created.
     * @param date - in YYYY-MM format
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getMonthNote(date: string, rootNote?: Note): Note | null;
    /**
     * Returns year note for given year. If such note doesn't exist, it is created.
     * @param year - in YYYY format
     * @param [rootNote] - specify calendar root note, normally leave empty to use the default calendar
     */
    getYearNote(year: string, rootNote?: Note): Note | null;
    /**
     * Sort child notes of a given note.
     * @param parentNoteId - this note's child notes will be sorted
     * @param [sortConfig.sortBy = title] - 'title', 'dateCreated', 'dateModified' or a label name
     *                                See {@link https://github.com/zadam/trilium/wiki/Sorting} for details.
     */
    sortNotes(parentNoteId: string, sortConfig?: {
        sortBy?: string;
        reverse?: boolean;
        foldersFirst?: boolean;
    }): void;
    /**
     * This method finds note by its noteId and prefix and either sets it to the given parentNoteId
     * or removes the branch (if parentNoteId is not given).
     *
     * This method looks similar to toggleNoteInParent() but differs because we're looking up branch by prefix.
     */
    setNoteToParent(noteId: string, prefix: string, parentNoteId: string | null): void;
    /**
     * This functions wraps code which is supposed to be running in transaction. If transaction already
     * exists, then we'll use that transaction.
     * @returns result of func callback
     */
    transactional(func: (...params: any[]) => any): any;
    /**
     * Return randomly generated string of given length. This random string generation is NOT cryptographically secure.
     * @param length - of the string
     * @returns random string
     */
    randomString(length: integer): string;
    /**
     * @param string - to escape
     * @returns escaped string
     */
    escapeHtml(string: string): string;
    /**
     * @param string - to unescape
     * @returns unescaped string
     */
    unescapeHtml(string: string): string;
    /**
     * sql
     */
    sql: SQL;
    /**
     * @returns - object representing basic info about running Trilium version
     */
    getAppInfo(): any | any;
    /**
     * Creates a new launcher to the launchbar. If the launcher (id) already exists, it will be updated.
     * @param opts.id - id of the launcher, only alphanumeric at least 6 characters long
     * @param opts.type - one of
     *                          * "note" - activating the launcher will navigate to the target note (specified in targetNoteId param)
     *                          * "script" -  activating the launcher will execute the script (specified in scriptNoteId param)
     *                          * "customWidget" - the launcher will be rendered with a custom widget (specified in widgetNoteId param)
     * @param [opts.isVisible = false] - if true, will be created in the "Visible launchers", otherwise in "Available launchers"
     * @param [opts.icon] - name of the boxicon to be used (e.g. "bx-time")
     * @param [opts.keyboardShortcut] - will activate the target note/script upon pressing, e.g. "ctrl+e"
     * @param [opts.targetNoteId] - for type "note"
     * @param [opts.scriptNoteId] - for type "script"
     * @param [opts.widgetNoteId] - for type "customWidget"
     */
    createOrUpdateLauncher(opts: {
        id: string;
        type: string;
        title: string;
        isVisible?: boolean;
        icon?: string;
        keyboardShortcut?: string;
        targetNoteId?: string;
        scriptNoteId?: string;
        widgetNoteId?: string;
    }): any;
    /**
     * @param format - either 'html' or 'markdown'
     */
    exportSubtreeToZipFile(noteId: string, format: string, zipFilePath: string): Promise<void>;
    /**
     * This object contains "at your risk" and "no BC guarantees" objects for advanced use cases.
     * @property {object} becca - provides access to the backend in-memory object graph, see {@link https://github.com/zadam/trilium/blob/master/src/becca/becca.js}
     */
    __private: {
        becca: object; // Leaving this intentionally generic typed as an object since this is not really meant to be a guaranteed part of the api.
    };
}




