import {integer} from "../../common";
import {Component} from "../component";
import {LoadResults} from "../loadresults";


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