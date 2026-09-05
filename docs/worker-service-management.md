# Externally Managed Worker

The Codex deployment branch supports `CLAUDE_MEM_WORKER_AUTOSTART: "false"`
in shared settings. The default remains `"true"`.

With automatic startup disabled, hooks wait for readiness without recycling
the worker, the shared spawn gate rejects automatic starts, and direct daemon
invocations exit unless launched with `CLAUDE_MEM_SERVICE_MANAGED=1`.
This marker is lifecycle coordination, not an authorization boundary.

Launch `bun plugin/scripts/worker-service.cjs --daemon` in the foreground under
a supervisor such as systemd, setting `CLAUDE_MEM_SERVICE_MANAGED=1`. Configure
the supervisor to restart after any exit. A managed worker does not spawn its
own successor on an HTTP restart request. Administrative shutdown requests
therefore restart it too; use the supervisor's stop command to keep it stopped.

All clients sharing a worker must use a build with this setting before opting
out of automatic startup. Upgrade client packages first, then restart the
service from its stable installed script path. Keep the existing data directory,
port, and provider settings. Disable the service and restore automatic startup
before reverting to an upstream build without this support.
