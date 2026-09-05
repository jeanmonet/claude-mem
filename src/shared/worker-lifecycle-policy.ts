import { loadFromFileOnce } from './hook-settings.js';

/** External supervisors own startup and upgrades when automatic startup is off. */
export function workerAutostartEnabled(
  settings: { CLAUDE_MEM_WORKER_AUTOSTART?: string } = loadFromFileOnce(),
): boolean {
  return settings.CLAUDE_MEM_WORKER_AUTOSTART !== 'false';
}

export function isServiceManagedWorker(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CLAUDE_MEM_SERVICE_MANAGED === '1';
}
