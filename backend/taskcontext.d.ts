import {integer} from "../common";


export class TaskContext {
    new(taskId: string, taskType?: string, data?: object): TaskContext;
    taskId: string;
    taskType: string;
    data: object;
    noteDeletionHandlerTriggered: boolean;
    progressCount: integer;
    lastSentCountTs: integer;
    getInstance(taskId: string, taskType: string, data?: object|null): Promise<TaskContext>;
    increaseProgressCount(): void;
    reportError(message: string): void;
    taskSucceeded(result: any): void;
}