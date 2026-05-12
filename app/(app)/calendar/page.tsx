const EVENTS = [
  { time: "10:00 AM", title: "Portfolio review" },
  { time: "02:30 PM", title: "Product sync" },
  { time: "06:00 PM", title: "Plan tomorrow" },
];

export default function CalendarPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-stone-400">Calendar</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-[34px] leading-tight text-stone-950">
          Calendar and tasks
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-stone-500">
          Your day, commitments, and open tasks in one quiet view.
        </p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
        {EVENTS.map(({ time, title }) => (
          <div key={title} className="flex items-center gap-4 border-b border-stone-100 px-3 py-4 last:border-b-0">
            <span className="w-20 text-[12px] text-stone-400">{time}</span>
            <span className="text-[13px] text-stone-700">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
