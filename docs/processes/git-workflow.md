# Git Workflow

Our Git workflow and best practices for version control.

## 🌿 Branching Strategy

### Main Branches

**`main`** (protected)
- Production-ready code
- Always deployable
- Direct commits not allowed
- Requires pull request + review

**`develop`** (protected)
- Integration branch
- Latest development changes
- Requires pull request + review

### Feature Branches

Create from: `develop`
Naming: `feature/<ticket-id>-<short-description>`

Examples:
```bash
feature/PROJ-123-user-authentication
feature/PROJ-456-api-improvements
```

### Bugfix Branches

Create from: `develop`
Naming: `bugfix/<ticket-id>-<short-description>`

Examples:
```bash
bugfix/PROJ-789-fix-login-error
bugfix/PROJ-234-null-pointer-exception
```

### Hotfix Branches

Create from: `main`
Naming: `hotfix/<ticket-id>-<short-description>`

Examples:
```bash
hotfix/PROJ-999-critical-security-patch
hotfix/PROJ-888-production-crash
```

## 🔄 Workflow Steps

### 1. Start New Work

```bash
# Update your local develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/PROJ-123-user-auth

# Or for bugfix
git checkout -b bugfix/PROJ-456-login-fix
```

### 2. Make Changes

```bash
# Make your changes
# Add files
git add .

# Commit with meaningful message
git commit -m "PROJ-123: Add user authentication endpoint"

# Push to remote
git push origin feature/PROJ-123-user-auth
```

### 3. Keep Branch Updated

```bash
# Regularly sync with develop
git checkout develop
git pull origin develop
git checkout feature/PROJ-123-user-auth
git merge develop

# Or use rebase (if you prefer)
git rebase develop
```

### 4. Create Pull Request

1. Push your branch to remote
2. Open PR on GitHub
3. Fill in PR template
4. Request reviewers
5. Link to ticket/issue

### 5. Address Review Feedback

```bash
# Make requested changes
git add .
git commit -m "PROJ-123: Address PR feedback"
git push origin feature/PROJ-123-user-auth
```

### 6. Merge

Once approved:
- Squash and merge (preferred for feature branches)
- Regular merge (for release branches)
- Delete branch after merge

## 📝 Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

**Good:**
```
feat(auth): add JWT authentication

Implement JWT-based authentication for API endpoints.
- Add JWT middleware
- Create login endpoint
- Add token refresh logic

Closes PROJ-123
```

**Also Good:**
```
fix(api): handle null response in user service

Fixes PROJ-456
```

**Short Form (for small changes):**
```
docs: update README with setup instructions
```

### Commit Message Guidelines
- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- First line max 50 characters
- Body wrapped at 72 characters
- Reference tickets/issues
- Explain why, not what (what is in the code)

## 🔍 Pull Request Guidelines

### PR Title
```
[PROJ-123] Add user authentication
```

### PR Description Template
```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added JWT authentication
- Created login endpoint
- Updated user model

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #123
Related to #456
```

### PR Best Practices
- Keep PRs small and focused
- Link to relevant issues
- Provide context in description
- Add screenshots for UI changes
- Respond promptly to feedback
- Keep the PR updated with develop

## 🚫 What NOT to Do

### Don't:
- ❌ Commit directly to `main` or `develop`
- ❌ Push secrets or credentials
- ❌ Commit generated files (build artifacts, dependencies)
- ❌ Make giant commits with unrelated changes
- ❌ Force push to shared branches
- ❌ Leave commented-out code
- ❌ Include personal IDE configurations

### Do:
- ✅ Use `.gitignore` properly
- ✅ Commit frequently with clear messages
- ✅ Keep branches up to date
- ✅ Test before pushing
- ✅ Review your own code first
- ✅ Clean up branches after merge

## 🔧 Useful Git Commands

### Viewing History
```bash
# View commit history
git log --oneline --graph --all

# View changes in a file
git log -p filename

# See who changed what
git blame filename
```

### Undoing Changes
```bash
# Undo uncommitted changes
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo pushed commit (create new commit)
git revert <commit-hash>
```

### Stashing
```bash
# Save work in progress
git stash

# List stashes
git stash list

# Apply last stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

### Cleaning Up
```bash
# Remove local branches merged to develop
git branch --merged develop | grep -v "\* develop" | xargs -n 1 git branch -d

# Remove remote-tracking branches that don't exist
git fetch --prune

# Clean untracked files (be careful!)
git clean -fd
```

## 🆘 Common Issues

### Merge Conflicts
```bash
# 1. Update your branch
git pull origin develop

# 2. Resolve conflicts in files
# Edit files, remove conflict markers

# 3. Mark as resolved
git add conflicted-file

# 4. Complete merge
git commit

# 5. Push
git push origin your-branch
```

### Accidentally Committed to Wrong Branch
```bash
# 1. Create correct branch from current state
git branch correct-branch

# 2. Reset current branch
git reset --hard origin/current-branch

# 3. Switch to correct branch
git checkout correct-branch
```

### Need to Update Commit Message
```bash
# Last commit (not pushed)
git commit --amend

# Last commit (already pushed) - avoid if possible
git commit --amend
git push --force-with-lease
```

## 📚 References

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Best Practices](https://sethrobertson.github.io/GitBestPractices/)

---

*A clean Git history is a joy to work with. Take the time to do it right.*
