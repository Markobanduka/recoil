import { atom } from "recoil";
import { userStateEffect } from "../Effects/userStateEffect";
import { localStorageEffect } from "../Effects/localStorageEffect";

interface Task {
  name: string;
}

export const tasksState = atom<Task[]>({
  key: "tasksState",
  default: [],
  effects_UNSTABLE: [localStorageEffect<Task[]>("taskData")],
  // effects_UNSTABLE: [userStateEffect("taskData")],
});
