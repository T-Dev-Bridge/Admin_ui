import { useEffect } from "react";
import { decryptData } from "../lib/crypto";
import { useSessionStore } from "../session";

export function useSyncSessionWithLocalStorage() {
  const setSession = useSessionStore((state) => state.setSession);
  const resetSession = useSessionStore((state) => state.resetSession);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "session" && event.newValue !== null) {
        try {
          const decryptedData = decryptData(event.newValue);
          const parsedData = JSON.parse(decryptedData);

          if (parsedData && parsedData.session) {
            setSession(parsedData.session);
          }
        } catch (error) {
          resetSession();
        }
      } else if (event.key === "session" && event.newValue === null) {
        resetSession();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setSession, resetSession]);
}
