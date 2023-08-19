export class Component {
    readonly componentId: string;
    readonly children: Component[];
    readonly initialized: boolean|null;
    readonly parent: Component;
    setParent(parent: Component): this;
    child(...components: Component[]): this;
    handleEvent(name: string, data: any): Promise<void>|null;
    triggerEvent(name: string, data?: any): Promise<void>;
    handleEventInChildren(name: string, data?: any): Promise<void>|null;
    triggerCommand(name: string, any?: any): Promise<any>;
    callMethod(func: CallableFunction, data: any): Promise<any>;
}