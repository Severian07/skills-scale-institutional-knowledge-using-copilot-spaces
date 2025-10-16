# Coding Standards

This document outlines our coding standards, conventions, and best practices. Following these standards ensures consistency across the codebase and makes code reviews more efficient.

## 🎯 General Principles

### Code Quality
- **Readability First**: Write code for humans first, computers second
- **KISS**: Keep It Simple, Stupid - avoid unnecessary complexity
- **DRY**: Don't Repeat Yourself - extract common code into reusable functions
- **YAGNI**: You Aren't Gonna Need It - don't add functionality until needed
- **Single Responsibility**: Each function/class should do one thing well

### Best Practices
- Write self-documenting code with clear variable and function names
- Keep functions small and focused (< 50 lines ideally)
- Use meaningful commit messages
- Add comments only when code can't be self-explanatory
- Handle errors gracefully
- Write tests for new code

## 📝 Language-Specific Standards

### JavaScript/TypeScript

**Naming Conventions:**
```javascript
// Use camelCase for variables and functions
const userName = 'John';
function getUserData() { }

// Use PascalCase for classes and components
class UserProfile { }
const MyComponent = () => { };

// Use UPPER_CASE for constants
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Use descriptive names
// Good
const isUserActive = true;
const fetchUserOrders = () => { };

// Bad
const flag = true;
const getData = () => { };
```

**Code Style:**
```javascript
// Use const by default, let when reassignment is needed
const config = { timeout: 5000 };
let counter = 0;

// Use template literals for string concatenation
const greeting = `Hello, ${userName}!`;

// Use arrow functions for callbacks
items.map(item => item.id);

// Use async/await over promises chains
async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Destructure when possible
const { name, email } = user;

// Use optional chaining
const street = user?.address?.street;
```

**Error Handling:**
```javascript
// Always handle errors
try {
  const data = await fetchData();
  processData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  // Handle error appropriately
}

// Use early returns
function processUser(user) {
  if (!user) return null;
  if (!user.isActive) return null;
  
  return transformUser(user);
}
```

### Python

**Naming Conventions:**
```python
# Use snake_case for variables and functions
user_name = 'John'
def get_user_data():
    pass

# Use PascalCase for classes
class UserProfile:
    pass

# Use UPPER_CASE for constants
MAX_RETRIES = 3
API_BASE_URL = 'https://api.example.com'
```

**Code Style:**
```python
# Follow PEP 8
# Use 4 spaces for indentation
# Max line length: 88 characters (Black formatter)

# Use type hints
def calculate_total(items: List[Item]) -> float:
    return sum(item.price for item in items)

# Use list comprehensions when appropriate
active_users = [user for user in users if user.is_active]

# Use context managers
with open('file.txt', 'r') as f:
    content = f.read()

# Use f-strings for formatting
message = f"Hello, {user_name}!"
```

**Error Handling:**
```python
# Use specific exceptions
try:
    data = fetch_data()
except requests.RequestException as e:
    logger.error(f"Failed to fetch data: {e}")
    raise
except ValueError as e:
    logger.warning(f"Invalid data format: {e}")
    return None
```

## 🏗️ Code Organization

### File Structure
```
src/
├── components/          # Reusable UI components
├── services/           # Business logic and API calls
├── utils/              # Utility functions
├── types/              # Type definitions
├── constants/          # Constants and configuration
└── tests/              # Test files
```

### Module Organization
- One class/component per file (exceptions for small related classes)
- Group related functionality together
- Keep imports organized (stdlib, third-party, local)

### Import Order
```javascript
// 1. Node.js built-ins
import path from 'path';

// 2. External libraries
import React from 'react';
import axios from 'axios';

// 3. Internal modules
import { config } from './config';
import { UserService } from './services/user';
```

## 🧪 Testing Standards

### Test Structure
```javascript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      // Arrange
      const userData = { name: 'John', email: 'john@example.com' };
      
      // Act
      const user = await UserService.createUser(userData);
      
      // Assert
      expect(user.id).toBeDefined();
      expect(user.name).toBe('John');
    });

    it('should throw error with invalid email', async () => {
      const userData = { name: 'John', email: 'invalid' };
      
      await expect(UserService.createUser(userData))
        .rejects
        .toThrow('Invalid email');
    });
  });
});
```

### Testing Guidelines
- Write tests for all new features
- Test edge cases and error conditions
- Use descriptive test names
- Keep tests independent
- Mock external dependencies
- Aim for 80%+ code coverage

## 📋 Code Review Checklist

Before submitting a PR, verify:
- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] Error handling is implemented
- [ ] Tests are included and passing
- [ ] No console.logs or debugging code
- [ ] Comments explain "why", not "what"
- [ ] No hardcoded values (use constants)
- [ ] Code is formatted (run prettier/black)
- [ ] No unused imports or variables

## 🛠️ Tools & Automation

### Linting
- **JavaScript/TypeScript**: ESLint
  ```bash
  npm run lint
  npm run lint:fix
  ```
- **Python**: pylint, flake8
  ```bash
  pylint src/
  flake8 src/
  ```

### Formatting
- **JavaScript/TypeScript**: Prettier
  ```bash
  npm run format
  ```
- **Python**: Black
  ```bash
  black src/
  ```

### Pre-commit Hooks
Set up git hooks to run linting and formatting before commits:
```bash
npm install husky --save-dev
npx husky install
```

## 📚 References

- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [PEP 8 - Python Style Guide](https://www.python.org/dev/peps/pep-0008/)
- [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

## 🔄 Updates

These standards are living documents. If you have suggestions for improvements:
1. Discuss with the team
2. Update this document
3. Communicate changes to everyone

---

*Remember: Consistency matters more than any individual preference.*
