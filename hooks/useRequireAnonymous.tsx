import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "./useCurrentUser";

// login required
export const useRequireAnonymous = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (CurrentUser) router.push("/");
  }, [isAuthChecking, CurrentUser]);
};
