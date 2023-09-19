export declare class Component {
    readonly componentId: string;
    readonly children: Component[];
    readonly initialized: boolean|null;
    readonly parent: Component;
    setParent(parent: Component): this;
    child(...components: readonly Component[]): this;
    handleEvent<T>(name: string, data: T): Promise<void>|null;
    triggerEvent<T>(name: string, data?: T): Promise<void>;
    handleEventInChildren<T>(name: string, data?: T): Promise<void>|null;
    triggerCommand<T, R>(name: string, data?: T): Promise<R>;
    callMethod<Func extends (...args: unknown[]) => unknown>(func: Func, data: Parameters<Func>): ReturnType<Func>;
}