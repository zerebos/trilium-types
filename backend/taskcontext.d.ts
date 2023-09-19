import {TaskType, integer} from "../common";


export declare class TaskContext {
    constructor(taskId: string, taskType?: string, data?: object);
    taskId: string;
    taskType: TaskType;
    data: object;
    noteDeletionHandlerTriggered: boolean;
    progressCount: integer;
    lastSentCountTs: integer;
    getInstance(taskId: string, taskType: TaskType, data?: object|null): Promise<TaskContext>;
    increaseProgressCount(): void;
    reportError(message: string): void;
    taskSucceeded<T>(result: T): void;
}