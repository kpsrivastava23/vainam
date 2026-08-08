const SUMMARY_CARDS = [
  { label: "Portfolio", value: "₹2.4L", detail: "Across connected investments" },
  { label: "Notifications", value: "5", detail: "Need your attention" },
  { label: "Connected apps", value: "12", detail: "Syncing in the background" },
  { label: "Today", value: "3 events", detail: "Calendar items lined up" },
  { label: "Tasks due", value: "2", detail: "Planned for today" },
];

/**
 * Renders the main dashboard page.
 */
export default function DashboardPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-stone-400">Dashboard</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[34px] leading-tight text-stone-950">
          Your personal universe
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-stone-500">
          A calm view of the things that matter right now: money, notifications, apps, calendar, and tasks.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {SUMMARY_CARDS.map(({ label, value, detail }) => (
          <article key={label} className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-[12px] text-stone-400">{label}</p>
            <p className="mt-2 text-[22px] font-medium text-stone-950">{value}</p>
            <p className="mt-1 text-[12px] leading-5 text-stone-500">{detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-[21px] text-stone-950">
            Priority feed
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            {["Review portfolio movement", "Clear app notifications", "Prepare for today's events"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg bg-stone-50 px-4 py-3">
                <span className="text-[13px] text-stone-700">{item}</span>
                <span className="text-[11px] text-stone-400">Today</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-[21px] text-stone-950">
            Connected apps
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Gmail", "Zerodha", "Groww", "Notion", "Slack", "Calendar"].map((app) => (
              <span key={app} className="rounded-full border border-stone-200 px-3 py-1 text-[12px] text-stone-500">
                {app}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
