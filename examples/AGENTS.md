# Clean Flow Workflow

When applying Git branch management and pull request flow in this repository, follow the **Clean Flow** workflow.

Reference: https://github.com/wgtechlabs/clean-flow

## Philosophy

Ship through dev. Keep main clean.

## Core Model

```text
main + dev + feature branches
feature/* -> squash merge -> dev -> merge commit -> main
```

## Rules

- Use `main` as the stable branch
- Use `dev` as the integration branch
- Create feature branches from `dev`
- Target feature pull requests to `dev`
- Use squash merge from feature branches into `dev`
- Use a regular merge commit from `dev` into `main`
- Do not send feature branches directly to `main`
- Do not commit directly to `main`
- Avoid direct commits to `dev`
- Delete feature branches after merge

## Recommended branch prefixes

- `feature/`
- `fix/`
- `docs/`
- `chore/`
- `test/`
- `refactor/`

## Examples

- `feature/user-authentication`
- `fix/login-validation`
- `docs/update-guide`
- `chore/update-dependencies`
- `test/payment-service`
- `refactor/api-client`
