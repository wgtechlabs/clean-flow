---
applyTo: "**"
---

# Clean Flow Workflow

This repository follows the **Clean Flow** workflow for Git branch management and pull request flow.

Reference: https://github.com/wgtechlabs/clean-flow

## Core Model

```text
main + dev + feature branches
feature/* -> squash merge -> dev -> merge commit -> main
```

## Branch Roles

- `main` is the stable branch (production-ready)
- `dev` is the integration branch (collects completed work)
- Feature branches are short-lived branches created from `dev`

## Rules

- Create feature branches from `dev`
- Target feature pull requests to `dev`
- Use squash merge from feature branches into `dev`
- Use a regular merge commit from `dev` into `main`
- Do not send feature branches directly to `main`
- Do not commit directly to `main`
- Avoid direct commits to `dev`
- Delete feature branches after merge

## Branch Naming

Use short, descriptive branch names with recommended prefixes:

- `feature/` - new features
- `fix/` - bug fixes
- `docs/` - documentation
- `chore/` - maintenance
- `test/` - tests
- `refactor/` - refactoring
