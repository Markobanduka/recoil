import { atom } from "recoil";
import { localStorageEffect } from "../Effects/localStorageEffect";

interface Task {
  name: string;
  id: number;
}

export const tasksState = atom<Task[]>({
  key: "tasksState",
  default: [],
  effects_UNSTABLE: [localStorageEffect<Task[]>("taskData")],
});
