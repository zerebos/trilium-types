import {NoteContextAwareWidget} from "./notecontextaware";


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