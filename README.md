# Clean Flow

> **Ship through dev. Keep main clean.**

[![Clean Flow – GitHub Repo Banner](https://ghrb.waren.build/banner?header=Clean+Flow+%F0%9F%8C%BF&subheader=Lightweight+Git+workflow+for+clean+dev-to-main+delivery&bg=013B84-016EEA&color=FFFFFF)](https://github.com/wgtechlabs/clean-flow)
<!-- Created with GitHub Repo Banner by Waren Gonzaga: https://ghrb.waren.build -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/wgtechlabs/clean-flow)

A lightweight Git workflow designed to keep the main branch stable while allowing completed work to integrate through a dedicated dev branch. Clean Flow is simpler than Git Flow and more structured than GitHub Flow.

**Note:** This is a documented personal workflow I've refined over years of practice. While I use the term "Clean Flow workflow" to describe this standardized approach, it may evolve into a broader convention as others adopt and adapt it.

---

## Why Clean Flow?

Existing Git workflows are either **too simple** or **too complex**:

- **GitHub Flow** sends feature branches directly into main — no integration step
- **Git Flow** introduces release branches, hotfix branches, and ceremony that many teams don't need

Clean Flow is different:
- **Structured**: A dedicated `dev` branch gates work before it reaches `main`
- **Simple**: Only three branch types — `main`, `dev`, and feature branches
- **Clean**: Squash merges keep history compact and scannable
- **Flexible**: Works for solo developers, small teams, and open source projects

---

## The Core Model

```
feature/* ──squash merge──> dev ──merge commit──> main
```

| Branch | Role |
|--------|------|
| `main` | Stable branch — production-ready or release-ready code |
| `dev` | Integration branch — collects completed feature work |
| `feature/*` | Short-lived branches for new work, created from `dev` |

---

## Quick Start

### 1. Sync the latest dev branch

```bash
git checkout dev
git pull origin dev
```

### 2. Create a feature branch from dev

```bash
git checkout -b feature/user-authentication
```

### 3. Work and commit

```bash
git add .
git commit -m "add user authentication system"
```

### 4. Keep the feature branch updated

```bash
git fetch origin
git rebase origin/dev
```

### 5. Push and open a pull request into dev

```bash
git push -u origin feature/user-authentication
```

Then open a pull request:

```
feature/user-authentication → dev
```

### 6. Squash merge the feature branch into dev

When approved, squash merge into `dev`. This turns multiple work-in-progress commits into one clean logical commit.

### 7. Merge dev into main when stable

```bash
git checkout main
git pull origin main
git merge dev
git push origin main
```

Use a regular merge commit to preserve the boundary between integration and stable history.

---

## Branch Naming

Use short, descriptive branch names with prefixes:

| Prefix | Use For |
|--------|---------|
| `feature/` | New features and functionality |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `chore/` | Maintenance and dependency updates |
| `test/` | Test additions and changes |
| `refactor/` | Code refactoring |

**Examples:**

```
feature/user-authentication
fix/cart-total-rounding
docs/installation-guide
chore/update-dependencies
test/payment-service
refactor/api-client
```

---

## Merge Strategy

### Feature branch into dev — Squash Merge

```
Feature branch commits:  A → B → C
Squash merge on dev:     S
```

**Why squash merge?**
- Keeps feature history compact
- Removes noisy work-in-progress commits
- Creates one logical commit per feature
- Keeps `dev` easier to scan

### Dev into main — Merge Commit

**Why merge commit?**
- Preserves the boundary between integration work and stable release history
- Makes it clear when `dev` was promoted to `main`

---

## Workflows

### Maintainer Workflow

Maintainers work against the primary repository.

```
origin/dev → local dev → feature branch → dev → main
```

1. Pull the latest `dev`
2. Create a feature branch from `dev`
3. Work, commit, and push
4. Open a pull request targeting `dev`
5. Squash merge into `dev`
6. When stable, merge `dev` into `main`

### Contributor Workflow

Contributors work from a fork.

```
upstream/dev → local dev → feature branch → origin → PR into upstream/dev
```

1. Sync from `upstream/dev`
2. Create a feature branch from `dev`
3. Work, commit, and push to your fork (`origin`)
4. Open a pull request into `upstream/dev`

---

## Pull Request Rules

Feature branches should **always target `dev`**.

**Correct:**

```
feature/user-authentication → dev
fix/login-validation → dev
docs/update-guide → dev
chore/update-dependencies → dev
```

**Avoid:**

```
feature/user-authentication → main
fix/login-validation → main
```

The `main` branch should receive changes from `dev`, not directly from feature branches.

---

## Common Scenarios

### Adding a new feature

Start from `dev`. Create a `feature/` branch. Target the PR to `dev`. Squash merge.

```
feature/user-profile → dev
```

### Fixing a bug

Start from `dev`. Create a `fix/` branch. Target the PR to `dev`. Squash merge.

```
fix/login-validation → dev
```

### Updating documentation

Start from `dev`. Create a `docs/` branch. Target the PR to `dev`. Squash merge.

```
docs/api-guide → dev
```

### Preparing a release

Verify `dev` is stable. Merge `dev` into `main`. Tag or publish the release if needed.

### Cleaning up merged branches

Delete feature branches after they are merged:

```bash
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

---

## Protected Branches

### Recommended protection for main

- Require pull requests
- Require status checks
- Restrict direct pushes
- Require review before merge
- Require up-to-date branches when appropriate

### Recommended protection for dev

- Require pull requests
- Require status checks
- Allow squash merges
- Restrict direct pushes when working with a team

---

## Comparison with Other Workflows

### Clean Flow vs GitHub Flow

| | GitHub Flow | Clean Flow |
|---|---|---|
| **Branches** | `main` + feature branches | `main` + `dev` + feature branches |
| **Feature target** | Directly into `main` | Into `dev` first |
| **Integration step** | None | `dev` collects completed work |
| **Best for** | Small projects, fast continuous deployment | Projects needing a stable integration step |

### Clean Flow vs Git Flow

| | Git Flow | Clean Flow |
|---|---|---|
| **Branches** | `main`, `develop`, `release/*`, `hotfix/*`, feature branches | `main`, `dev`, feature branches |
| **Complexity** | More formal and complex | Simpler and easier to maintain |
| **Release process** | Dedicated release and hotfix branches | No required release or hotfix ceremony |
| **Best for** | Complex versioned release processes | Projects wanting structure without overhead |

---

## When to Use Clean Flow

**Use Clean Flow when:**
- You want `main` to stay stable
- You want feature work integrated into `dev` first
- You want cleaner history through squash merges
- GitHub Flow feels too direct
- Git Flow feels too complex
- You work with contributors or forks
- You release from stable milestones
- You want simple branch rules that are easy to teach

**Clean Flow may not be necessary when:**
- You deploy every commit directly from `main`
- Your project is very small and has only one maintainer
- You need formal release and hotfix branches
- Your organization already uses strict Git Flow
- You require trunk-based development only

---

## Best Practices

1. **Keep `main` production-ready** — Only merge `dev` into `main` when the project is stable
2. **Use `dev` as the working integration branch** — All completed feature work should land in `dev` first
3. **Squash feature branches** — Turn work-in-progress commits into one clean logical commit
4. **Keep feature branches short-lived** — Long-lived branches drift from `dev` and become harder to merge
5. **Update before submitting** — Always rebase your feature branch against the latest `dev` before submitting a PR
6. **Delete merged branches** — After a feature branch is merged, delete it locally and remotely
7. **Protect `main` and `dev`** — Branch protection prevents accidental direct pushes

---

## Example End-to-End Flow

```bash
git checkout dev
git pull origin dev
git checkout -b feature/user-authentication
# ... do your work ...
git add .
git commit -m "add user authentication system"
git fetch origin
git rebase origin/dev
git push -u origin feature/user-authentication
```

Then open a pull request:

```
feature/user-authentication → dev
```

After approval: Squash merge into `dev`.

When stable: Merge `dev` into `main`.

---

## AI Integration

Copy these templates to integrate Clean Flow with AI coding assistants.

### GitHub Copilot

Copy [`examples/copilot.instructions.md`](examples/copilot.instructions.md) to your project:

```bash
mkdir -p .github/instructions
curl -o .github/instructions/copilot.instructions.md https://raw.githubusercontent.com/wgtechlabs/clean-flow/main/examples/copilot.instructions.md
```

### AI Agents (Codex, Claude, Cursor, Windsurf, etc.)

Copy [`examples/AGENTS.md`](examples/AGENTS.md) to your project root:

```bash
curl -o AGENTS.md https://raw.githubusercontent.com/wgtechlabs/clean-flow/main/examples/AGENTS.md
```

---

## Learn More

- [**SPECIFICATION.md**](SPECIFICATION.md) - Full technical specification with detailed guidelines
- [**QUICK-REFERENCE.md**](QUICK-REFERENCE.md) - Single-page cheatsheet for quick lookup

---

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

---

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## Credits

Created with love by **[Waren Gonzaga](https://github.com/warengonzaga)** / **[WG Tech Labs](https://github.com/wgtechlabs)**

---

<p align="center">
  <strong>Ship through dev. Keep main clean.</strong>
</p>
