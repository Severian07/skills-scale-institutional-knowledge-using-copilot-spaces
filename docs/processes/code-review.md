# Code Review Guidelines

Best practices for reviewing code and getting your code reviewed.

## 🎯 Purpose of Code Review

Code review helps us:
- Catch bugs before they reach production
- Share knowledge across the team
- Maintain code quality and consistency
- Learn from each other
- Ensure code meets requirements

## 👥 Roles

### Author
The person who wrote the code and created the PR.

### Reviewer
Team member(s) reviewing the code.

## 📝 Before Requesting Review

### Author Checklist

- [ ] Self-review your own code first
- [ ] Code follows [coding standards](../standards/coding-standards.md)
- [ ] All tests pass locally
- [ ] New tests added for new functionality
- [ ] Documentation updated (if needed)
- [ ] No debugging code (console.logs, etc.)
- [ ] PR description is clear and complete
- [ ] PR is reasonably sized (< 400 lines)
- [ ] Commits are clean and well-organized

### Making a Good PR

**Keep it Small**
- Aim for 200-400 lines changed
- Large PRs are hard to review
- Break large features into smaller PRs

**Provide Context**
- Clear description of what and why
- Link to relevant tickets/issues
- Screenshots for UI changes
- Note any breaking changes

**Make it Reviewable**
- Clean commit history
- Logical code organization
- Self-documenting code
- Comments where needed

## 🔍 Reviewing Code

### Review Checklist

#### Functionality
- [ ] Does the code do what it's supposed to?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?
- [ ] Are there any obvious bugs?

#### Code Quality
- [ ] Is the code clear and readable?
- [ ] Are variable/function names descriptive?
- [ ] Is it DRY (no unnecessary duplication)?
- [ ] Is complexity appropriate?
- [ ] Any code smells?

#### Testing
- [ ] Are there tests for new functionality?
- [ ] Do tests cover edge cases?
- [ ] Are tests clear and maintainable?
- [ ] Do all tests pass?

#### Standards
- [ ] Follows [coding standards](../standards/coding-standards.md)
- [ ] Consistent with existing codebase
- [ ] Appropriate use of design patterns
- [ ] No anti-patterns

#### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No SQL injection risks
- [ ] Authentication/authorization checked

#### Performance
- [ ] No obvious performance issues
- [ ] Appropriate use of caching
- [ ] Database queries optimized
- [ ] No N+1 query problems

#### Documentation
- [ ] README updated if needed
- [ ] API docs updated
- [ ] Complex code commented
- [ ] Changelog updated (if applicable)

## 💬 Providing Feedback

### Types of Comments

**Required Changes (Blocking)**
```
❗ This will cause a memory leak. Need to clean up listeners.
```

**Suggestions (Non-blocking)**
```
💡 Consider using Promise.all() here for better performance.
```

**Questions**
```
❓ Why did we choose this approach over X?
```

**Praise**
```
✨ Great use of the strategy pattern here!
```

**Nitpicks (Optional)**
```
🎨 Nitpick: This could be a const instead of let.
```

### Communication Guidelines

**Be Kind**
- Remember there's a person behind the code
- Focus on the code, not the person
- Assume good intent

**Be Specific**
```
❌ "This is confusing"
✅ "This function name doesn't clearly indicate it modifies state"
```

**Be Constructive**
```
❌ "This is wrong"
✅ "This could cause issues when X happens. Consider Y instead."
```

**Explain Why**
```
✅ "Extract this into a function because it's used in 3 places and makes the code more testable."
```

**Offer Alternatives**
```javascript
// Instead of just saying "this is inefficient", provide an alternative:

// Current approach could be improved
const result = items.filter(i => i.active).map(i => i.name);

// Suggestion:
// Use reduce to iterate once instead of twice
const result = items.reduce((acc, item) => {
  if (item.active) acc.push(item.name);
  return acc;
}, []);
```

## 🚀 Responding to Feedback

### As an Author

**Be Receptive**
- Don't take feedback personally
- Reviewers are helping you
- It's about the code, not about you

**Respond Promptly**
- Address feedback quickly
- Answer questions clearly
- Explain your reasoning when needed

**Make Changes**
```markdown
✅ Fixed in abc123
✅ Good catch! Updated.
✅ Addressed in latest commit
```

**Ask for Clarification**
```markdown
❓ Could you elaborate on this concern?
❓ What would you recommend instead?
❓ I'm not sure I understand. Can you provide an example?
```

**Discuss Disagreements**
- It's okay to disagree respectfully
- Explain your perspective
- Be open to compromise
- Escalate if needed

## ⚡ Review Turnaround

### Timing Expectations

**For Reviewers:**
- Acknowledge PR within 4 hours
- Complete review within 1 business day
- Smaller PRs (<100 lines) within 2 hours

**For Authors:**
- Respond to feedback within 1 business day
- Re-request review after changes

### Priority Reviews
Mark urgent PRs:
- `[URGENT]` in title
- Note in #engineering channel
- Direct message reviewers

## 🎨 Review Examples

### Example 1: Logic Issue
```javascript
// ❗ Blocking Issue
// This condition will never be true because we check `!user` first
if (!user) {
  return null;
}
if (user.id === null) {  // This line is unreachable
  return null;
}

// Suggestion: Combine conditions
if (!user || user.id === null) {
  return null;
}
```

### Example 2: Suggestion
```javascript
// 💡 Suggestion
// Current code works but could be cleaner
function getActiveUsers(users) {
  const active = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].active) {
      active.push(users[i]);
    }
  }
  return active;
}

// Consider using filter for readability
function getActiveUsers(users) {
  return users.filter(user => user.active);
}
```

### Example 3: Question
```python
# ❓ Question
# Why are we using a set here instead of a list?
# If order doesn't matter, this is fine, but wanted to confirm.
user_ids = set(fetch_user_ids())
```

### Example 4: Praise
```typescript
// ✨ Excellent!
// Love how you extracted this complex logic into a well-named function.
// Makes the code much more readable and testable.
function validateUserPermissions(user: User, resource: Resource): boolean {
  // ...
}
```

## 🔄 The Review Process

### 1. Initial Review
- Reviewer provides feedback
- Uses labels: blocking, suggestion, question

### 2. Author Updates
- Makes changes
- Responds to comments
- Re-requests review

### 3. Follow-up Review
- Reviewer checks changes
- Resolves or continues discussion

### 4. Approval
- All blocking issues resolved
- Reviewer approves PR
- Author can merge

### 5. Post-Merge
- Monitor deployment
- Watch for issues
- Be available for questions

## 🚫 Code Review Anti-Patterns

### Don't:
- ❌ Approve without actually reviewing
- ❌ Nitpick without approving (if only minor issues)
- ❌ Request perfect code (good enough is good)
- ❌ Delay reviews unnecessarily
- ❌ Leave vague comments
- ❌ Ignore your own PRs waiting for review
- ❌ Get defensive about feedback
- ❌ Make personal comments

### Do:
- ✅ Review thoroughly but efficiently
- ✅ Approve with minor suggestions
- ✅ Provide specific, actionable feedback
- ✅ Review PRs from oldest to newest
- ✅ Ask questions when unclear
- ✅ Help authors improve
- ✅ Accept feedback graciously
- ✅ Focus on code, not people

## 🎓 Learning from Reviews

### For Authors
- Learn from reviewer feedback
- Notice patterns in comments
- Study approved code
- Ask questions

### For Reviewers
- See different approaches
- Learn new patterns
- Understand team standards
- Share knowledge

## 📚 Resources

- [Google's Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [GitHub's Pull Request Best Practices](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)
- [The Art of Code Review](https://www.alexandra-hill.com/2018/06/25/the-art-of-giving-and-receiving-code-reviews/)

## 🆘 Getting Help

If you're unsure about feedback:
- Ask for clarification
- Discuss in team channel
- Schedule a quick call
- Pair program on it

---

*Code review is a conversation, not a judgment. We're all learning together.*
