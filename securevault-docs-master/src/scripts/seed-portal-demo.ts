// Optional import & run in dev layout
import { seedBusinessDemo, seedPersonalDemo } from '@/lib/portal-db';

export function runSeeds() {
  seedBusinessDemo();
  seedPersonalDemo();
}

