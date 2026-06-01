# Clean Flow Specification

Version: 1.0.0

This document provides the complete technical specification for the Clean Flow workflow.

**About this workflow:** Clean Flow is a documented personal workflow I've refined over years of practice across multiple projects. It represents my standardized approach to Git branch management and pull request flow. As others adopt and adapt it, it may evolve into a broader convention over time.

---

## Table of Contents

- [Philosophy](#philosophy)
- [Core Model](#core-model)
- [Branch Roles](#branch-roles)
- [Merge Strategy](#merge-strategy)
- [Workflow Rules](#workflow-rules)
- [Branch Naming](#branch-naming)
- [Pull Request Rules](#pull-request-rules)
- [Protected Branches](#protected-branches)
- [Maintainer Workflow](#maintainer-workflow)
- [Contributor Workflow](#contributor-workflow)
- [Common Scenarios](#common-scenarios)
- [Comparison with Other Workflows](#comparison-with-other-workflows)
- [Edge Cases & FAQs](#edge-cases--faqs)

---

## Philosophy

**Ship through dev. Keep main clean.**

Clean Flow is a lightweight Git workflow designed to keep the `main` branch stable while allowing completed work to integrate through a dedicated `dev` branch.

Clean Flow is simpler than Git Flow and more structured than GitHub Flow.

---

## Core Model

### Branch Structure

```
main + dev + feature branches
```

### Merge Flow

```
feature/* ──squash merge──> dev ──merge commit──> main
```

### Visual Diagram

```
main:       M0 ────────────────────────── M1 (merge commit from dev)
             \                           /
dev:          D0 ── S1 ── S2 ── S3 ────D1
                    ↑     ↑     ↑
                    │     │     │
feature/*:    (squash merges from feature branches)
```

Where `S1`, `S2`, `S3` are squash-merged feature commits on `dev`, and `M1` is a merge commit promoting `dev` to `main`.

---

## Branch Roles

### main

The `main` branch is the **stable branch**.

- It should contain production-ready or release-ready code
- Do not use `main` for active feature development
- Do not commit directly to `main`
- Changes should reach `main` only by merging `dev` into `main`

### dev

The `dev` branch is the **integration branch**.

- It collects completed feature work before release
- Feature branches should be created from `dev`
- Pull requests from feature branches should target `dev`
- The `dev` branch is promoted to `main` when stable

### Feature Branches

Feature branches are **short-lived branches** created from `dev`.

- Use feature branches for new features, bug fixes, documentation, tests, refactoring, and maintenance
- Feature branches should be deleted after they are merged
- Feature branches should target `dev`, never `main`

---

## Merge Strategy

### Feature Branch into dev — Squash Merge

When a feature is approved, **squash merge** it into `dev`.

```
Feature branch commits:  A → B → C
Squash merge result:     S (single commit on dev)
```

**Rationale:**
- Squash merging keeps feature history compact
- It removes noisy work-in-progress commits
- It creates one logical commit per feature
- It keeps `dev` easier to scan and understand

### Dev into main — Merge Commit

When `dev` is stable, merge it into `main` using a **regular merge commit**.

**Rationale:**
- A merge commit preserves the boundary between integration work and stable release history
- It makes it clear when `dev` was promoted to `main`
- It maintains the timeline of stable releases

### Summary

| Merge Direction | Strategy | Reason |
|-----------------|----------|--------|
| Feature → `dev` | Squash merge | Clean, compact history |
| `dev` → `main` | Merge commit | Preserves promotion boundary |

---

## Workflow Rules

These are the core rules of Clean Flow:

1. **Keep `main` stable** — Only merge `dev` into `main` when the project is stable
2. **Use `dev` as the integration branch** — All completed feature work should land in `dev` first
3. **Create feature branches from `dev`** — Never branch from `main` for feature work
4. **Target pull requests to `dev`** — Feature branches should always target `dev`
5. **Squash merge feature branches into `dev`** — Keep history clean and compact
6. **Merge `dev` into `main` when stable** — Use a merge commit to promote
7. **Delete feature branches after merge** — Keep the branch list clean
8. **Do not commit directly to `main`** — All changes must flow through `dev`
9. **Avoid committing directly to `dev`** — Prefer feature branches and PRs
10. **Keep feature branches short-lived** — Long-lived branches drift and cause conflicts
11. **Sync before starting new work** — Always pull the latest `dev` before branching
12. **Update feature branches before submitting** — Rebase against `dev` before opening a PR
13. **Protect `main` and `dev`** — Use branch protection rules

---

## Branch Naming

Use short, descriptive branch names.

### Recommended Prefixes

| Prefix | Use For |
|--------|---------|
| `feature/` | New features and functionality |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `chore/` | Maintenance and dependency updates |
| `test/` | Test additions and changes |
| `refactor/` | Code refactoring |

### Examples

```
feature/user-authentication
feature/dark-mode-toggle
fix/cart-total-rounding
fix/login-validation
docs/installation-guide
docs/api-reference
chore/update-dependencies
chore/clean-up-imports
test/payment-service
test/auth-integration
refactor/api-client
refactor/database-layer
```

### Naming Rules

- Use lowercase
- Use hyphens to separate words
- Keep names short but descriptive
- One branch per logical change

---

## Pull Request Rules

### Targeting

Feature branches should **always target `dev`**, never `main`.

**Correct:**

```
feature/user-authentication → dev
fix/login-validation → dev
docs/update-guide → dev
chore/update-dependencies → dev
test/payment-service → dev
refactor/api-client → dev
```

**Avoid:**

```
feature/user-authentication → main
fix/login-validation → main
```

The `main` branch should receive changes from `dev`, not directly from feature branches.

### Review and Approval

- All pull requests should be reviewed before merging
- Require at least one approval before merge
- Use status checks to validate code quality
- Resolve all review comments before merging

### After Merge

- Delete the feature branch after merge (both locally and remotely)
- Verify the squash merge commit message is clean and descriptive

---

## Protected Branches

### Recommended Protection for main

- Require pull requests before merging
- Require status checks to pass before merging
- Restrict direct pushes
- Require review approval before merge
- Require branches to be up to date before merging (when appropriate)
- Do not allow force pushes
- Do not allow deletions

### Recommended Protection for dev

- Require pull requests before merging
- Require status checks to pass before merging
- Allow squash merges
- Restrict direct pushes when working with a team
- Do not allow force pushes
- Do not allow deletions

---

## Maintainer Workflow

Maintainers usually work against the primary repository.

### Default Remotes

```
origin/main
origin/dev
```

### Flow

```
origin/dev → local dev → feature branch → PR into dev → squash merge → dev → main
```

### Step-by-Step

1. Sync the latest `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. Create a feature branch from `dev`:
   ```bash
   git checkout -b feature/user-authentication
   ```

3. Work and commit:
   ```bash
   git add .
   git commit -m "add user authentication system"
   ```

4. Keep the feature branch updated:
   ```bash
   git fetch origin
   git rebase origin/dev
   ```

5. Push and open a pull request:
   ```bash
   git push -u origin feature/user-authentication
   ```
   Target: `feature/user-authentication → dev`

6. After approval, squash merge into `dev`

7. When stable, merge `dev` into `main`:
   ```bash
   git checkout main
   git pull origin main
   git merge dev
   git push origin main
   ```

---

## Contributor Workflow

Contributors usually work from a fork.

### Default Remotes

```
upstream/main
upstream/dev
origin/feature-branch
```

### Flow

```
upstream/dev → local dev → feature branch → push to origin → PR into upstream/dev
```

### Step-by-Step

1. Fork the repository on GitHub

2. Clone your fork and add upstream:
   ```bash
   git clone https://github.com/YOUR-USERNAME/project.git
   cd project
   git remote add upstream https://github.com/ORIGINAL-OWNER/project.git
   ```

3. Sync from upstream:
   ```bash
   git fetch upstream
   git checkout dev
   git merge upstream/dev
   ```

4. Create a feature branch from `dev`:
   ```bash
   git checkout -b feature/user-authentication
   ```

5. Work, commit, and push to your fork:
   ```bash
   git add .
   git commit -m "add user authentication system"
   git push -u origin feature/user-authentication
   ```

6. Open a pull request:
   Target: `YOUR-USERNAME:feature/user-authentication → upstream:dev`

---

## Common Scenarios

### Adding a New Feature

1. Start from `dev`
2. Create a `feature/` branch
3. Target the pull request to `dev`
4. Squash merge into `dev`

### Fixing a Bug

1. Start from `dev`
2. Create a `fix/` branch
3. Target the pull request to `dev`
4. Squash merge into `dev`

### Updating Documentation

1. Start from `dev`
2. Create a `docs/` branch
3. Target the pull request to `dev`
4. Squash merge into `dev`

### Preparing a Release

1. Verify `dev` is stable
2. Merge `dev` into `main` using a merge commit
3. Tag or publish the release if needed

### Cleaning Up Merged Branches

```bash
# Delete locally
git branch -d feature/user-authentication

# Delete remotely
git push origin --delete feature/user-authentication
```

---

## Comparison with Other Workflows

### Clean Flow vs GitHub Flow

| Aspect | GitHub Flow | Clean Flow |
|--------|-------------|------------|
| Branch model | `main` + feature branches | `main` + `dev` + feature branches |
| Feature target | Directly into `main` | Into `dev` first |
| Integration branch | None | `dev` |
| Merge strategy | Merge or squash into `main` | Squash into `dev`, merge into `main` |
| Stability | `main` may receive incomplete work | `main` stays stable |
| Best for | Small projects, fast CD | Projects needing integration gate |

### Clean Flow vs Git Flow

| Aspect | Git Flow | Clean Flow |
|--------|----------|------------|
| Branch model | `main`, `develop`, `release/*`, `hotfix/*`, features | `main`, `dev`, features |
| Complexity | High — many branch types | Low — three branch types |
| Release branches | Required | Not required |
| Hotfix branches | Required | Not required |
| Merge strategy | Merge commits throughout | Squash to `dev`, merge to `main` |
| Best for | Complex versioned releases | Simple structured workflow |

---

## Edge Cases & FAQs

### Should feature branches target main?

No. In Clean Flow, feature branches should target `dev`.

```
Correct: feature/* → dev
Avoid:   feature/* → main
```

### Should feature branches be squash merged?

Yes. Feature branches should be squash merged into `dev` to keep history clean.

### Should dev be squash merged into main?

No. The recommended strategy is to merge `dev` into `main` using a regular merge commit. This preserves the promotion boundary.

### Can contributors use Clean Flow with forks?

Yes. Contributors can sync from `upstream/dev`, create feature branches locally, push to their fork, and open pull requests into `upstream/dev`.

### Is Clean Flow the same as GitHub Flow?

No. GitHub Flow usually sends feature branches directly into `main`. Clean Flow adds `dev` between feature branches and `main`.

### Is Clean Flow the same as Git Flow?

No. Git Flow includes `develop`, `release/*`, and `hotfix/*` branches. Clean Flow keeps the model simpler with `main`, `dev`, and feature branches.

### Can dev be renamed?

The convention uses `dev` by default. Some tools may allow configuring the development branch name, but teams should keep the branch name consistent across the project.

### Can I commit directly to dev?

Avoid direct commits to `dev` when possible. Prefer feature branches and pull requests. Direct commits may be acceptable for small administrative changes, but they should be rare.

### Can I commit directly to main?

No. Direct commits to `main` should always be avoided. `main` should stay stable and only receive changes from `dev`.

### What if I need a hotfix on main?

Create a `fix/` branch from `dev`, fix the issue, squash merge into `dev`, then merge `dev` into `main`. If `dev` has work that shouldn't go to `main` yet, consider cherry-picking the fix commit from `dev` to `main` as an exception.

### What about release branches?

Clean Flow does not require release branches. When `dev` is stable, merge it directly into `main`. If your project needs dedicated release preparation, you can optionally create a short-lived release branch from `dev`, but this is not part of the core workflow.

---

<p align="center">
  <strong>Ship through dev. Keep main clean.</strong>
</p>
