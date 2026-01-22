// src/app/api/demo/personal/vault/route.ts
// Personal demo vault API

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      {
        id: "a1",
        name: "Passport.pdf",
        type: "PDF",
        size: 240,
        ts: Date.now() - 86400e3,
        labels: ["ID"],
      },
      {
        id: "a2",
        name: "Lease-2025.docx",
        type: "DOCX",
        size: 120,
        ts: Date.now() - 2 * 86400e3,
        labels: ["Housing"],
      },
      {
        id: "a3",
        name: "Receipt-HomeDepot.jpg",
        type: "JPG",
        size: 860,
        ts: Date.now() - 3 * 86400e3,
        labels: ["Receipt", "Home"],
      },
      {
        id: "a4",
        name: "Insurance-Card.pdf",
        type: "PDF",
        size: 180,
        ts: Date.now() - 5 * 86400e3,
        labels: ["Insurance", "ID"],
      },
      {
        id: "a5",
        name: "Tax-Return-2024.pdf",
        type: "PDF",
        size: 450,
        ts: Date.now() - 7 * 86400e3,
        labels: ["Tax"],
      },
    ],
  });
}

export async function POST() {
  return NextResponse.json({ ok: true });
}

