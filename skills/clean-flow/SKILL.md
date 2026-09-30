---
name: clean-flow
description: Apply Clean Flow when preparing Git branches, pull requests, merges, or dev-to-main promotions in adopting repositories, or when the user requests it. Respect other repositories' established branch workflows.
---

# Clean Flow

Ship through `dev`. Keep `main` stable. This skill works without Clean Workflow
or any other skill. Git is needed for local operations; GitHub CLI or an
available GitHub integration is needed for remote PR operations.

## Establish the target and scope

Read repository instructions, contribution guidance, branch policy, and the
user's request. Inspect status, current branch, remotes, and relevant remote
refs before choosing a base or destination. Do not infer remote ownership from
the directory name or assume `origin` is the upstream repository.

Apply Clean Flow when the project adopts it or the user requests it, subject
to explicit repository requirements. Installation alone does not migrate a
repository. For external contributions, preserve the upstream project's branch
and PR rules. Resolve a material conflict before changing its workflow.

A request for advice or an audit is read-only. Branch preparation, PR creation,
merging, promotion, branch deletion, and changing protection settings are
different actions: carry out only those covered by the user's request and
existing authorization. Do not ask again for authorization already supplied.

## Branch and PR model

| Branch | Role | Destination and merge method |
| --- | --- | --- |
| `main` | Stable, production-ready or release-ready history | Receives stable `dev` through a regular merge commit |
| `dev` | Integration of completed work | Receives short-lived branches through squash merges |
| Short-lived work branch | One logical change, based on current `dev` | PR into `dev` |

Use lowercase, hyphen-separated descriptions and the appropriate prefix:
`feature/`, `fix/`, `docs/`, `chore/`, `test/`, or `refactor/`.
Follow an explicitly configured integration branch name instead of inventing
a second branch. Avoid direct work on `main` or `dev`.

## Prepare work

1. Inspect staged, unstaged, and untracked work. Preserve unrelated changes;
   do not stash, reset, discard, or carry them into a new branch blindly. Reuse
   a suitable checkout or use an isolated checkout when switching would mix work.
2. Fetch the appropriate remote. Maintainers normally base work on
   `origin/dev`; contributors normally base work on `upstream/dev` and push
   their feature branch to their fork (`origin`). Verify these roles first.
3. If the integration ref is missing, report it. Create it only when repository
   setup is in scope and its intended starting commit is established; never
   silently fall back to `main` or push to an arbitrary remote.
4. Reuse a suitable feature branch or create one from the verified integration
   ref. If advancing a local integration branch, prefer a fast-forward and
   investigate divergence rather than resetting it.
5. Before submitting, fetch again and update the feature branch from the
   integration branch as required by project policy. Rebase only when safe for
   that branch's ownership and publication state; it is not permission to
   rewrite a shared branch or force-push.
6. Open the authorized PR against the verified upstream integration branch.
   Confirm repository, head, and base through remote read-back.

## Merge and promote

For an authorized feature merge, inspect the current PR head, required reviews,
checks, conflicts, and unresolved review requirements. Clean Flow defaults to
at least one review approval and all review comments resolved before merging,
even when branch protection does not enforce them. Follow explicit target
repository overrides. Squash into `dev` only when these requirements are
satisfied. Use the repository's commit
message convention; this skill does not require installing Clean Commit.

For an authorized promotion, inspect the complete `dev` versus `main` diff and
apply the same review and check requirements to the promotion PR. Merge stable
`dev` into `main` using a regular merge commit,
not a squash or rebase merge. Do not promote unrelated or unready work just
to deliver one fix. Creating a promotion PR does not authorize merging it,
tagging a release, publishing, or deploying.

The specification documents cherry-picking a fix from `dev` to `main` as an
exception when `dev` contains unready work. Use that exception only when the
target repository permits it and the specific action is authorized; explain
the exception and required follow-up synchronization. Release branches are
optional project-specific extensions, not required by Clean Flow.

Delete a feature branch only when cleanup is in scope, its work is verified as
merged, and no checkout or ongoing work needs it. A squash merge may not satisfy
Git's ancestry-based deletion check; a failed safe delete is not permission to
force deletion. Never delete `main` or `dev` as feature cleanup.

## Verify and report

Read back local branch state after local changes and authoritative remote PR
or branch state after remote changes. If a write has an uncertain result,
inspect state before retrying. Report the target repository, relevant branch
or PR, completed actions, and unresolved checks or access limits.

## Source and maintenance

Derived from [Clean Flow specification v1.0.0](https://github.com/wgtechlabs/clean-flow/blob/main/SPECIFICATION.md).
Essential rules are bundled here so installed use does not require fetching
the specification. This repository owns the skill; keep it aligned with
specification changes. Clean Workflow can consume released copies downstream.
