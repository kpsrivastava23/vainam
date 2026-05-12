export default function ForgotPasswordPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-[12px] uppercase tracking-[0.14em] text-stone-400">Account</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-[34px] leading-tight text-stone-950">
        Reset your password
      </h1>
      <p className="mt-3 text-[14px] leading-6 text-stone-500">
        Enter your email and Vainam will send reset instructions when authentication is connected.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-[14px] text-stone-900 placeholder:text-stone-300 focus:border-stone-400 focus:outline-none"
        />
        <button
          type="button"
          className="rounded-lg bg-stone-900 px-4 py-2.5 text-[14px] font-medium text-stone-50 transition-colors duration-200 hover:bg-stone-700"
        >
          Send reset link
        </button>
      </div>
    </section>
  );
}
