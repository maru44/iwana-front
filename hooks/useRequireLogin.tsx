import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "./useCurrentUser";

interface nextProps {
  next: string;
}

// login required
export const useRequireLogin = () => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (!CurrentUser) router.push("/user/login");
  }, [isAuthChecking, CurrentUser]);
};
