"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const AUTH_STORAGE_KEY = "vainam-authenticated";
const PROTECTED_ROUTES = ["/dashboard", "/finance", "/notifications", "/apps", "/calendar"];

/** Sets the authentication state in local storage and dispatches a change event. */
export function setVainamAuthenticated() {
  window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
  window.dispatchEvent(new Event("vainam-auth-changed"));
}

export function isVainamAuthenticated() {
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export default function AuthRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const loggedIn = isVainamAuthenticated();
    const isProtectedRoute = PROTECTED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (loggedIn && pathname === "/") {
      router.replace("/dashboard");
      return;
    }

    if (!loggedIn && isProtectedRoute) {
      router.replace("/");
    }
  }, [pathname, router]);

  return null;
}
