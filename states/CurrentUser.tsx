import { User } from "../types/any";
import { atom } from "recoil";

// undefined >> 確認前
// null >> 未ログイン
// User >> type user
export const CurrentUserState = atom<undefined | null | User>({
  key: "CurrentUser",
  default: undefined,
});

export default CurrentUserState;
