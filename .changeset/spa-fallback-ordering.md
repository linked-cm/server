---
'@_linked/server': patch
---

Install the SPA catch-all after `setupAfterControllers`, and re-pin it after HMR.

The client shell is served from a catch-all `GET *`, which is only a fallback by
accident of registration order. Two supported paths register GET routes once it
already exists: `setupAfterControllers` (a documented provider hook, which ran
*after* the catch-all was installed) and `onSourceChange`, where
`disposeRoutes()` splices a provider's layers out and `registerRoute()` can only
append them back. A route that ends up behind the catch-all is answered with the
HTML shell at status 200, so it reads as an auth/config problem rather than a
routing one.

The catch-all now goes on last, in its own `installSpaFallback()` step after
`setupAfterControllers`, and `onSourceChange` re-pins it once providers have
re-registered. Ordering is asserted at registration time from the two places
that create the situation, so nothing hooks express's dispatch path. Trailing
error-handling middleware (arity-4) is deliberately kept behind the fallback, so
errors thrown while rendering the shell still reach the app's error handler.

Adds the package's first test harness (jest + ts-jest) with coverage for the
ordering, the dispose/re-register cycle, error-handler placement, idempotency,
and a negative control asserting the shell wins when re-pinning is skipped.
