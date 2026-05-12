const APPS = ["Gmail", "Zerodha", "Groww", "Notion", "Slack", "Google Calendar", "Drive", "Todoist"];

export default function AppsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-stone-400">Apps</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[34px] leading-tight text-stone-950">
          Connected apps
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-stone-500">
          Manage the services that power your dashboard.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {APPS.map((app) => (
          <article key={app} className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-[15px] font-medium text-stone-950">{app}</p>
            <p className="mt-1 text-[12px] text-stone-500">Connected</p>
          </article>
        ))}
      </div>
    </section>
  );
}
