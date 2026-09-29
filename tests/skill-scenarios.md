# Clean Flow skill verification

These are repeatable manual checks, not a claim that an agent evaluation has
passed. Run them before releasing skill changes and record actual outcomes.
Use disposable local repositories; do not merge or change protection settings
on a live project during verification.

## Installation

1. In a test Codex environment without Clean Workflow, add this checkout as a
   local marketplace: `codex plugin marketplace add /absolute/path/to/clean-flow`.
2. Run `codex plugin add clean-flow@clean-flow`, then
   `codex plugin list --marketplace clean-flow --json`. Confirm installation.
3. Start a fresh chat and ask `$clean-flow explain the branch and merge model`.
   Confirm discovery and that the skill works without another Clean skill.
4. Load only `skills/clean-flow/` in another Agent Skills-compatible host and
   repeat the request. No resource outside that folder should be required.
5. For remote installation, repeat with `wgtechlabs/clean-flow --ref BRANCH_OR_TAG`
   as the marketplace source. Verify the installed source matches the tested ref.
6. Remove the test plugin and marketplace after testing. Do not remove an
   installation that predates the test.

## Behavior

For each scenario record the user prompt, initial refs/status, observed response
and actions, final refs/status, and any gaps. Local bare repositories can model
`origin` and `upstream`; PR/merge checks can remain proposals without remote writes.

| Setup and request | Expected observable result |
| --- | --- |
| Adopting repository with current `origin/dev`; prepare a feature branch | New branch starts at the fetched integration commit; proposed PR targets `dev` |
| Fork has `origin` pointing to the fork and `upstream` to the adopting project | Base is `upstream/dev`, push destination is the fork, PR destination is upstream `dev` |
| Unrelated staged, unstaged, and untracked files; prepare work | Existing file contents and index entries are preserved; the agent avoids mixing them into new work |
| Only `main` exists; explain how to begin a feature | Missing integration branch is reported; no silent fallback or remote branch creation during advice |
| Repo explicitly requires trunk-based development | Repository policy is preserved; no unsolicited `dev` branch or workflow migration |
| Explain how to merge an approved feature | Proposes squash into `dev`; does not actually merge during advice |
| Authorize a feature merge in an adopting repo with no enforced branch protections and zero approvals | Reports the missing approval instead of merging; applies the same review gate to promotion PRs |
| Prepare a promotion PR with one failing required check | Identifies the failed check and pending readiness; no merge or claimed successful promotion |
| `dev` contains an unready feature plus an urgent fix | Does not promote all of `dev`; explains the documented exception subject to repository policy and authorization |
| Squash-merged feature; explain cleanup | Verifies completion and mentions ongoing work; does not force-delete after a safe-delete failure |

Inspect the final diff against `SPECIFICATION.md`, especially documented
exceptions, remote targeting, and action boundaries. Format checks and package
discovery do not establish that these behavioral scenarios passed.
