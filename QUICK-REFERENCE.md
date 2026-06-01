# Clean Flow Quick Reference

**One-page cheatsheet for Clean Flow workflow**

---

## Philosophy

**Ship through dev. Keep main clean.**

---

## Core Model

```
feature/* ──squash merge──> dev ──merge commit──> main
```

---

## Branch Roles

| Branch | Role |
|--------|------|
| `main` | Stable — production-ready code |
| `dev` | Integration — collects completed work |
| `feature/*` | Short-lived — new work from `dev` |

---

## Merge Strategy

| Direction | Strategy |
|-----------|----------|
| Feature → `dev` | Squash merge |
| `dev` → `main` | Merge commit |

---

## Quick Start

```bash
# 1. Sync dev
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Work and commit
git add .
git commit -m "add my feature"

# 4. Update before submitting
git fetch origin
git rebase origin/dev

# 5. Push and open PR into dev
git push -u origin feature/my-feature
# PR: feature/my-feature → dev

# 6. After approval: squash merge into dev
# 7. When stable: merge dev into main
```

---

## Branch Naming

| Prefix | Use For |
|--------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation |
| `chore/` | Maintenance |
| `test/` | Tests |
| `refactor/` | Refactoring |

**Examples:**

```
feature/user-authentication
fix/login-validation
docs/installation-guide
chore/update-dependencies
test/payment-service
refactor/api-client
```

---

## PR Targeting

**Always target `dev`:**

```
feature/user-authentication → dev    ✅
fix/login-validation → dev           ✅
docs/update-guide → dev              ✅
```

**Never target `main` directly:**

```
feature/user-authentication → main   ❌
```

---

## Rules Checklist

- `main` is the stable branch
- `dev` is the integration branch
- Feature branches created from `dev`
- PRs target `dev`
- Squash merge features into `dev`
- Merge commit `dev` into `main`
- Delete branches after merge
- No direct commits to `main`
- Avoid direct commits to `dev`
- Keep feature branches short-lived
- Sync before starting new work
- Update branches before submitting
- Protect `main` and `dev`

---

## Maintainer Flow

```
origin/dev → local dev → feature branch → PR → squash merge → dev → main
```

## Contributor Flow (Fork)

```
upstream/dev → local dev → feature branch → push to origin → PR → upstream/dev
```

---

## Common Scenarios

| Scenario | Branch | Target | Merge |
|----------|--------|--------|-------|
| New feature | `feature/` | `dev` | Squash |
| Bug fix | `fix/` | `dev` | Squash |
| Documentation | `docs/` | `dev` | Squash |
| Release | — | `main` | Merge `dev` into `main` |
| Cleanup | Delete merged branches | — | — |

---

## Cleanup

```bash
# Delete locally
git branch -d feature/user-authentication

# Delete remotely
git push origin --delete feature/user-authentication
```

---

## Comparison

| | GitHub Flow | Clean Flow | Git Flow |
|---|---|---|---|
| Integration branch | None | `dev` | `develop` |
| Release branches | No | No | Yes |
| Hotfix branches | No | No | Yes |
| Feature target | `main` | `dev` | `develop` |
| Complexity | Low | Medium | High |

---

<p align="center">
  <strong>Ship through dev. Keep main clean.</strong>
</p>
