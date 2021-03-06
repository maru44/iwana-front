import { useRecoilValue } from "recoil";
import CurrentUserState from "../states/CurrentUser";

export const useCurrentUser = () => {
  // CurrentUser from global state
  const CurrentUser = useRecoilValue(CurrentUserState);
  // login 情報取得前
  const isAuthChecking = CurrentUser === undefined;

  return {
    CurrentUser,
    isAuthChecking,
  };
};
