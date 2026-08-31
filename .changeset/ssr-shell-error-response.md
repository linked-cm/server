---
'@_linked/server': patch
---

Answer the request when the SSR shell errors instead of letting it hang.

`onShellError` logged the error and returned without touching `res`, so any
render-time crash left the socket open until the 10s watchdog fired and replied
with a bare "SSR timed out". Every render crash therefore cost 10 seconds and
surfaced as a generic timeout, with the real exception buried in the server log.

Respond immediately with the actual error and stack, and clear the watchdog.
`timeout` is hoisted above `renderToPipeableStream` so the handler can clear it —
it was previously a `const` declared after the call, so referencing it from
`onShellError` would risk a TDZ `ReferenceError`. Also handles the case where the
shell already streamed (`res.headersSent`) by ending the response rather than
attempting to write a status.

Verified against an induced render crash: 0.43s with the real stack, versus 10.1s
and "SSR timed out" before.
