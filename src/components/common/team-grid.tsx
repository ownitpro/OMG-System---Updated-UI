import * as React from "react";
export type TeamMember = {
  name: string; role: string; bio: string; headshot?: string; social?: { label: string; href: string }[];
};

export function TeamGrid({ members, values }: { members: TeamMember[]; values?: string[] }) {
  return (
    <section className="py-16 bg-off">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-ink">Leadership & Team</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {members.map((m) => (
            <div key={m.name} className="rounded-2xl border border-neutral-200 bg-white p-6">
              {m.headshot ? <img src={m.headshot} alt={`${m.name} headshot`} className="h-16 w-16 rounded-full object-cover" /> : null}
              <h3 className="mt-3 font-semibold">{m.name}</h3>
              <p className="text-sm text-neutral-600">{m.role}</p>
              <p className="mt-3 text-neutral-700">{m.bio}</p>
              {m.social?.length ? (
                <div className="mt-3 flex gap-3">
                  {m.social.map((s) => (
                    <a key={s.href} href={s.href} className="text-primary underline">{s.label}</a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {values?.length ? (
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold">Our values</h3>
            <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
              {values.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
