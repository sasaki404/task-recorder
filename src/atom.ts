import { atom } from 'recoil';
import { Task, TaskColumn } from "./type"

export const TaskColumnsState = atom<TaskColumn[]>({
    key: "TaskColumnState",
    default: [],
})

export const TasksState = atom<Task[]>({
    key: "TaskState",
    default: [],
})

export const TaskIndex = atom<number>({
    key: "TaskIndex",
    default: 0
})