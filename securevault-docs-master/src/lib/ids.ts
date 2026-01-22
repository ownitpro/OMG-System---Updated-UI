// src/lib/ids.ts

export const rid = (): string => Math.random().toString(36).slice(2, 10);

export const nowIso = (): string => new Date().toISOString();

