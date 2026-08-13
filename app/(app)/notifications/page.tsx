const NOTIFICATIONS = [
  "Groww SIP reminder is due today",
  "Gmail has 3 priority messages",
  "Calendar event starts in 45 minutes",
  "Notion workspace sync completed",
  "Slack mention from product channel",
];

/**
 * Renders the unified notifications page.
 */
export default function NotificationsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-stone-400">Notifications</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[34px] leading-tight text-stone-950">
          Unified notification feed
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-stone-500">
          One calm feed for the app updates that need your attention.
        </p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
        {NOTIFICATIONS.map((item) => (
          <div key={item} className="flex items-center justify-between border-b border-stone-100 px-3 py-4 last:border-b-0">
            <span className="text-[13px] text-stone-700">{item}</span>
            <span className="text-[11px] text-stone-400">New</span>
          </div>
        ))}
      </div>
    </section>
  );
}
