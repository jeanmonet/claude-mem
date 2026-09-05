import { describe, expect, it } from 'bun:test';
import { workerAutostartEnabled, isServiceManagedWorker } from '../../src/shared/worker-lifecycle-policy.js';

describe('external worker lifecycle', () => {
  it('preserves automatic startup by default', () => {
    expect(workerAutostartEnabled({})).toBe(true);
    expect(workerAutostartEnabled({ CLAUDE_MEM_WORKER_AUTOSTART: 'true' })).toBe(true);
  });
  it('opts out explicitly', () => {
    expect(workerAutostartEnabled({ CLAUDE_MEM_WORKER_AUTOSTART: 'false' })).toBe(false);
  });
  it('requires an explicit service marker', () => {
    expect(isServiceManagedWorker({})).toBe(false);
    expect(isServiceManagedWorker({ CLAUDE_MEM_SERVICE_MANAGED: '0' })).toBe(false);
    expect(isServiceManagedWorker({ CLAUDE_MEM_SERVICE_MANAGED: '1' })).toBe(true);
  });
});
