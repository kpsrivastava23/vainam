"use client";

import { useEffect, useState } from "react";
import { isVainamAuthenticated } from "./auth-redirect";

const STATUS_ITEMS = [
  "₹2.4L portfolio",
  "5 notifications",
  "12 apps connected",
  "3 events today",
  "2 tasks due",
];

export default function LoggedInStatusStrip() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(isVainamAuthenticated());

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("vainam-auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("vainam-auth-changed", syncAuthState);
    };
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-hide">
      {STATUS_ITEMS.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-500 whitespace-nowrap"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
