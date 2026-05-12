export default function FinancePage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-stone-400">Finance</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[34px] leading-tight text-stone-950">
          Portfolio and mutual funds
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-stone-500">
          Track connected investment accounts, fund movement, and account-level summaries from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["₹2.4L portfolio", "8 active funds", "3 connected accounts"].map((item) => (
          <div key={item} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-[18px] font-medium text-stone-950">{item}</p>
            <p className="mt-2 text-[13px] leading-6 text-stone-500">Live finance data will appear here after integrations are connected.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
