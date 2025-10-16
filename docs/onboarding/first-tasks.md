# First Tasks for New Developers

Recommended starter tasks to help you get familiar with the codebase.

## 🎯 Getting Started

These tasks are designed to:
- Help you understand the codebase
- Get comfortable with our development workflow
- Make your first contributions
- Learn from experienced team members

## 📋 Recommended First Tasks

### 1. Documentation Tasks (Easiest)

Perfect for your very first contribution!

**Update README**
- Fix typos or unclear sections
- Add missing setup steps
- Improve examples
- Estimated time: 30 minutes

**Add Code Comments**
- Document complex functions
- Add JSDoc/docstring comments
- Clarify business logic
- Estimated time: 1 hour

### 2. Small Bug Fixes (Easy)

Look for issues tagged with `good-first-issue`:

**Fix Typos in UI**
- Spelling mistakes
- Grammar errors
- Inconsistent wording
- Estimated time: 30 minutes

**Fix Small Bugs**
- Off-by-one errors
- Null checks
- Edge case handling
- Estimated time: 2-4 hours

### 3. Add Tests (Medium)

**Write Unit Tests**
- Test a function that lacks coverage
- Add edge case tests
- Test error handling
- Estimated time: 2-3 hours

**Write Integration Tests**
- Test an API endpoint
- Test component interactions
- Test database operations
- Estimated time: 3-4 hours

### 4. Refactoring Tasks (Medium)

**Extract Duplicated Code**
- Find repeated code blocks
- Create reusable functions
- Update call sites
- Estimated time: 3-4 hours

**Improve Code Quality**
- Simplify complex functions
- Improve variable names
- Add error handling
- Estimated time: 2-4 hours

### 5. Small Features (Medium-Hard)

**Add Input Validation**
- Validate form inputs
- Add error messages
- Test edge cases
- Estimated time: 4-6 hours

**Improve Error Messages**
- Make errors more helpful
- Add error codes
- Improve logging
- Estimated time: 3-5 hours

## 🔍 Finding Tasks

### Check Issue Tracker
Look for labels:
- `good-first-issue` - Perfect for newcomers
- `help-wanted` - Need contributors
- `documentation` - Documentation tasks
- `bug` - Bug fixes
- `enhancement` - Small improvements

### Ask the Team
- Daily standup
- Team chat
- Your mentor
- Project lead

### Look for TODOs
```bash
# Search for TODO comments
grep -r "TODO" src/
```

## 📝 Example First Task: Fix a Typo

Let's walk through a complete example:

### 1. Find the Issue
- Check issues for `good-first-issue` label
- Or notice a typo yourself

### 2. Create Branch
```bash
git checkout develop
git pull origin develop
git checkout -b bugfix/PROJ-123-fix-typo-in-docs
```

### 3. Make the Change
```bash
# Edit the file
code docs/README.md

# Fix the typo
# Save the file
```

### 4. Test Locally
```bash
# If it's code, run tests
npm test

# If it's documentation, review it
```

### 5. Commit Changes
```bash
git add docs/README.md
git commit -m "fix(docs): correct typo in README"
git push origin bugfix/PROJ-123-fix-typo-in-docs
```

### 6. Create Pull Request
- Go to GitHub
- Click "New Pull Request"
- Fill in the template
- Request reviewers
- Link to issue

### 7. Address Feedback
- Respond to comments
- Make requested changes
- Push updates
- Re-request review

### 8. Merge!
- Once approved, merge your PR
- Celebrate! 🎉
- Delete your branch

## 💡 Tips for Success

### Do:
- ✅ Start small
- ✅ Ask questions
- ✅ Read existing code
- ✅ Follow coding standards
- ✅ Write tests
- ✅ Update documentation
- ✅ Request help when stuck

### Don't:
- ❌ Take on too much at once
- ❌ Skip testing
- ❌ Ignore code review feedback
- ❌ Commit broken code
- ❌ Be afraid to ask questions

## 🤝 Getting Help

### Stuck on Something?
1. Try to solve it yourself (15-30 minutes)
2. Search documentation and Stack Overflow
3. Ask in team chat
4. Pair with a team member
5. Schedule time with your mentor

### Questions to Ask:
- "Where should I start looking?"
- "Is this the right approach?"
- "Can you explain how this works?"
- "Can we pair on this?"

## 🎓 Learning Goals

By completing 3-5 starter tasks, you should be able to:
- [ ] Navigate the codebase confidently
- [ ] Follow the git workflow
- [ ] Create PRs and respond to reviews
- [ ] Write code that follows our standards
- [ ] Run tests locally
- [ ] Understand the build process
- [ ] Know where to find information
- [ ] Feel comfortable asking questions

## 📈 What's Next?

After completing starter tasks:
1. Take on more complex features
2. Review others' PRs
3. Help onboard the next new team member
4. Contribute to architecture discussions
5. Identify improvements to the codebase

## 🎉 Celebrate Your Progress

Don't forget to:
- Celebrate your first merged PR
- Share your wins in team chat
- Update your onboarding checklist
- Thank your reviewers
- Help the next newcomer

---

**Remember**: Everyone was new once. You've got this! 💪
