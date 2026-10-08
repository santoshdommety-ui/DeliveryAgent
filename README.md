# DeliveryAgent

A delivery manager's portfolio dashboard for tracking commitments, prioritising work, coaching delivery leads, and catching quality risks early.

## Run

Requires Node.js 22 or later. No external dependencies or credentials required.

```sh
npm ci
npm test
npm start
```

The server uses port 3000 (override with `PORT`). `npm run dev` restarts the server on file changes. `/health` reports server readiness.

## First version

- Portfolio overview with active work, attention signals and quality readiness.
- Create and edit deliverables, owners, due dates, status and progress.
- Weighted prioritisation: `(business value + urgency + risk reduction) / effort * 10`.
- Lead scorecards: completion counts, blocked work, overdue work and quality readiness.
- Shift-left gates for acceptance criteria, test planning and security review.
- Explainable recommendations for overdue work, blockers and missing quality gates.
- Browser-local persistence and JSON export. Seed data is illustrative; reset explicitly replaces local changes.

Recommendations use deterministic rules; no language model is connected. Data is stored per browser, with no shared backend, authentication, historical KPI collection or production access controls. Do not use this prototype for confidential production data. Current scorecards are portfolio signals, not employee productivity scores. Completion counts are not evidence of on-time delivery.

## Suggested AI roadmap

1. **Delivery copilot:** grounded summaries and weekly reports from Jira/Azure DevOps, with links to source evidence and human approval before updates.
2. **Priority advisor:** scenario comparisons using business outcomes, cost of delay, capacity and dependencies; explain ranking changes.
3. **Shift-left reviewer:** flag ambiguous acceptance criteria, missing test coverage, architecture dependencies and security review needs before sprint commitment.
4. **Risk radar:** identify stalled work, dependency bottlenecks and forecast uncertainty from historical events.
5. **Lead KPI trends:** measure forecast accuracy, milestone predictability, cycle time, escaped defects, blocked time and DORA signals over agreed reporting windows.
6. **Action tracking:** explicit risk/action/issue/dependency register, escalation owners, follow-up dates and decision log.

Next implementation should introduce authenticated shared storage, connector credentials in secure settings, historical events, agreed KPI definitions and access controls. AI output should cite its evidence and remain reviewable.
