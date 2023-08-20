export class Component {
    readonly componentId: string;
    readonly children: Component[];
    readonly initialized: boolean|null;
    readonly parent: Component;
    setParent(parent: Component): this;
    child(...components: ReadonlyArray<Component>): this;
    handleEvent(name: string, data: any): Promise<void>|null;
    triggerEvent(name: string, data?: any): Promise<void>;
    handleEventInChildren(name: string, data?: any): Promise<void>|null;
    triggerCommand(name: string, data?: any): Promise<any>;
    callMethod<Func extends (...args: any[]) => any>(func: Func, data: Parameters<Func>): Promise<any>;
}