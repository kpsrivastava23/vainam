// src/app/(auth)/login/page.tsx
// For signup, duplicate and swap `mode` to "signup"

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isVainamAuthenticated, setVainamAuthenticated } from "./auth-redirect";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
type Mode = "login" | "signup";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.07 17.64 11.762 17.64 9.205z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg> 
  );
}

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.694-5.29c-1.3 1.533-3.43 2.74-4.957 2.66-.195-1.56.572-3.19 1.78-4.21C13.895.563 15.944-.39 17.274-.416c.17 1.638-.487 3.247-1.428 4.023z"/>
    </svg>
  );
}

// ─── Feature list shown on left panel ────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: "Unified notifications",
    desc: "From all your apps, one feed",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: "Mutual funds & portfolio",
    desc: "Track Zerodha, Groww & more",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "40+ app integrations",
    desc: "Gmail, Notion, Slack & beyond",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Calendar & tasks",
    desc: "Your day, at a glance",
  },
];

const STATS = [
  { value: "40+", label: "App integrations" },
  { value: "1 view", label: "All notifications" },
  { value: "Live", label: "MF & portfolio" },
  { value: "Free", label: "To get started" },
];

// ─── Social button ────────────────────────────────────────────────────────────

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-white text-[13.5px] text-stone-700 hover:bg-stone-50 transition-colors duration-150 font-[family-name:var(--font-body)]"
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-[12px] text-stone-500 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-[14px] text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-150 font-[family-name:var(--font-body)]"
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const router = useRouter();
  const isLogin = mode === "login";

  useEffect(() => {
    if (isVainamAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

 const continueToDashboard = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    console.log("USER:", user);

    setVainamAuthenticated();

    router.replace("/dashboard");
  } catch (error) {
    console.error("Google Sign In Error:", error);
  }
};

  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      <header className="border-b border-stone-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-stone-200">
              <Image
                src="/images/vainam-logo.webp"
                alt="Vainam logo"
                width={40}
                height={37}
                priority
                sizes="40px"
                className="h-9 w-auto object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-[23px] leading-none text-stone-900">
                Vainam
              </span>
              <span className="mt-1 hidden text-[10.5px] tracking-[0.1em] text-stone-400 sm:inline">
                your personal universe
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12.5px] font-medium text-stone-600 shadow-sm transition-colors duration-150 hover:border-stone-300 hover:text-stone-900"
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-[900px] rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[560px]">

        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <div className="md:w-[46%] bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 p-9 flex flex-col justify-between">
          <div>
            <Link href="/" className="mb-8 inline-flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
                <Image
                  src="/images/vainam-logo.webp"
                  alt="Vainam logo"
                  width={52}
                  height={48}
                  priority
                  sizes="52px"
                  className="h-12 w-auto object-contain"
                />
              </span>
              <span className="flex flex-col">
                <span className="font-[family-name:var(--font-display)] text-[24px] leading-none text-stone-900">Vainam</span>
                <span className="mt-1 text-[10.5px] tracking-[0.1em] text-stone-400">your personal universe</span>
              </span>
            </Link>

            {isLogin ? (
              <>
                <p className="font-[family-name:var(--font-display)] text-[26px] leading-[1.25] text-stone-900 mb-3">
                  Everything you need,<br />
                  <em>in one still place.</em>
                </p>
                <p className="text-[13px] text-stone-500 leading-[1.7] mb-7">
                  Notifications, mutual funds, connected apps, calendar, tasks — all in a single calm dashboard.
                </p>
                <div className="flex flex-col gap-3.5">
                  {FEATURES.map(({ icon, title, desc }) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className="w-[30px] h-[30px] rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-stone-800">{title}</div>
                        <div className="text-[11.5px] text-stone-400">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="font-[family-name:var(--font-display)] text-[26px] leading-[1.25] text-stone-900 mb-4">
                  Your whole life,<br />
                  <em>finally organised.</em>
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {STATS.map(({ value, label }) => (
                    <div key={label} className="bg-white border border-stone-200 rounded-xl p-3.5">
                      <div className="text-[20px] font-medium text-stone-900 mb-0.5">{value}</div>
                      <div className="text-[11.5px] text-stone-400">{label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <p className="text-[12px] text-stone-400 italic font-[family-name:var(--font-display)]">
            {isLogin
              ? '"Clarity is the new productivity."'
              : '"Order is the shape upon which beauty depends."'}
          </p>
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────── */}
        <div className="flex-1 p-9 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="font-[family-name:var(--font-display)] text-[22px] text-stone-900 mb-1">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-[13px] text-stone-500">
              {isLogin
                ? "Sign in to your personal universe"
                : "Free forever. No credit card needed."}
            </p>
          </div>

          {/* Social logins */}
          <div className="flex flex-col gap-2.5 mb-5">
            <SocialButton
              icon={<GoogleIcon />}
              label={isLogin ? "Continue with Google" : "Sign up with Google"}
              onClick={continueToDashboard}
            />
            <SocialButton
              icon={<AppleIcon />}
              label={isLogin ? "Continue with Apple" : "Sign up with Apple"}
              onClick={continueToDashboard}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 text-[11.5px] text-stone-400 mb-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span>{isLogin ? "or sign in with email" : "or with email"}</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" type="text" placeholder="Rahul" />
                <Field label="Last name" type="text" placeholder="Sharma" />
              </div>
            )}
            <Field label="Email" type="email" placeholder="you@example.com" />
            <div>
              {isLogin && (
                <div className="flex justify-between mb-1.5">
                  <label className="text-[12px] text-stone-500">Password</label>
                  <Link href="/forgot-password" className="text-[12px] text-stone-400 hover:text-stone-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              )}
              {!isLogin && <label className="block text-[12px] text-stone-500 mb-1.5">Password</label>}
              <input
                type="password"
                placeholder={isLogin ? "••••••••" : "Create a strong password"}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-[14px] text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-150 font-[family-name:var(--font-body)]"
              />
            </div>

            <button
              type="button"
              onClick={continueToDashboard}
              className="mt-1 w-full py-2.5 rounded-lg bg-stone-900 text-stone-50 text-[14px] font-medium hover:bg-stone-700 transition-colors duration-200 font-[family-name:var(--font-body)]"
            >
              {isLogin ? "Sign in to Vainam" : "Create my Vainam account"}
            </button>
          </div>

          {/* Mode toggle */}
          <p className="mt-5 text-center text-[13px] text-stone-500">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(isLogin ? "signup" : "login")}
              className="text-stone-900 font-medium hover:underline underline-offset-2"
            >
              {isLogin ? "Create a free account →" : "Sign in →"}
            </button>
          </p>
<div></div>
          {!isLogin && (
            <p className="mt-2 text-center text-[11.5px] text-stone-400">
              By continuing you agree to our{" "}
              <Link href="/terms" className="hover:text-stone-600">Terms</Link>{" "}
              &{" "}
              <Link href="/privacy" className="hover:text-stone-600">Privacy Policy</Link>
            </p>
          )}
        </div>
      </div>
      </main>
    </div>
  );
}
