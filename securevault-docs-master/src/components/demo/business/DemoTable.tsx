// src/components/demo/business/DemoTable.tsx
// Demo table component for business demo

"use client";

import * as React from "react";

type Col = { key: string; title: string; width?: string };

export function DemoTable({
  cols,
  rows,
}: {
  cols: Col[];
  rows: Record<string, React.ReactNode>[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900/80">
          <tr>
            {cols.map((c) => (
              <th
                key={c.key}
                style={{ width: c.width }}
                className="text-left px-3 py-2 font-medium text-zinc-300 border-b border-zinc-800"
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-zinc-950">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={cols.length} className="px-3 py-6 text-center text-zinc-400">
                No items found
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/40">
                {cols.map((c) => (
                  <td key={c.key} className="px-3 py-2 text-zinc-200">
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

