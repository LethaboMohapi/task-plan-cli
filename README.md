# Task Plan CLI

![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-f7df1e) ![Dependencies](https://img.shields.io/badge/dependencies-zero-success)

A dependency-free project planning demo that converts a JSON task list into overdue, due-today, and upcoming work. Demonstrates schema validation, deterministic date handling, sorting, and unit tests.

## Run

Use Node.js 22 or newer. No installation of packages required.

```sh
npm test
npm run demo
node cli.js sample.json 2026-10-31
```

The synthetic sample produces 4 tasks, 1 completed task, and 1 task in each open-work group. Output is JSON; failures print a readable message and exit with code 1.

## Input contract

Each task needs a unique non-empty string `id`, a non-empty `title`, a real `due` calendar date in `YYYY-MM-DD`, a `status` of `todo`, `doing`, or `done`, and integer `priority` from 1 (highest) to 3 (lowest). See `sample.json`.

The supplied date is explicit so results are reproducible across time zones. Tasks due on that date are due today, not overdue. Completed tasks count toward totals but are excluded from open-work groups. Open tasks sort by due date, then priority, then ID. The input array is not modified. This demo reports existing tasks; it does not save edits or sync with a service.

## Try extending it

- Add filters for assignees or labels, with tests.
- Add a Markdown report output option.
- Add CI to run `npm test` on proposed changes.

Contributions should solve a clear problem, describe expected output, and include relevant tests. Use fictional task data.
