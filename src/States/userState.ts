import { atom } from "recoil";
import { localStorageEffect } from "../Effects/localStorageEffect";

interface UserState {
  LoggedIn: boolean;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    LoggedIn: false,
  },
  effects_UNSTABLE: [localStorageEffect("userData")],
});
