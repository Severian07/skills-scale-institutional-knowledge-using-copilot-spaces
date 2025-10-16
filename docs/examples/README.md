# Examples & Templates

Reusable code examples, project templates, and common patterns.

## 📚 Contents

- [Code Examples](#code-examples) - Common patterns and snippets
- [Project Templates](#project-templates) - Starting points for new projects
- [Documentation Templates](#documentation-templates) - Templates for various docs

## 💻 Code Examples

### API Request Handler (Node.js/Express)

```javascript
// controllers/userController.js
const { body, validationResult } = require('express-validator');
const UserService = require('../services/userService');
const logger = require('../utils/logger');

/**
 * Create a new user
 * @route POST /api/users
 */
exports.createUser = [
  // Validation middleware
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('password').isLength({ min: 8 }),

  // Handler
  async (req, res) => {
    try {
      // Check validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: errors.array() 
        });
      }

      // Create user
      const userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };

      const user = await UserService.create(userData);

      // Log success
      logger.info('User created', { userId: user.id });

      // Return response
      res.status(201).json({
        message: 'User created successfully',
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt
        }
      });

    } catch (error) {
      logger.error('Error creating user', { error: error.message });
      
      if (error.code === 'DUPLICATE_EMAIL') {
        return res.status(409).json({
          error: 'Email already exists'
        });
      }

      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
];
```

### Service Layer Pattern (Node.js)

```javascript
// services/userService.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

class UserService {
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<User>}
   */
  async create(userData) {
    try {
      // Check if user exists
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        const error = new Error('Email already exists');
        error.code = 'DUPLICATE_EMAIL';
        throw error;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });

      return user;
    } catch (error) {
      logger.error('UserService.create failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<User|null>}
   */
  async getById(userId) {
    return await User.findById(userId);
  }

  /**
   * Update user
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<User>}
   */
  async update(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await user.update(updateData);
  }

  /**
   * Delete user
   * @param {string} userId - User ID
   * @returns {Promise<boolean>}
   */
  async delete(userId) {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }

    await user.delete();
    return true;
  }
}

module.exports = new UserService();
```

### React Component Pattern

```typescript
// components/UserList.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../types/user';
import { userService } from '../services/userService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { UserCard } from './UserCard';

interface UserListProps {
  filter?: 'active' | 'inactive' | 'all';
  onUserClick?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ 
  filter = 'all',
  onUserClick 
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers({ filter });
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user: User) => {
    onUserClick?.(user);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={fetchUsers}
      />
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Users ({users.length})</h2>
      <div className="user-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </div>
    </div>
  );
};
```

### Python API Handler (Flask)

```python
# routes/user_routes.py
from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from services.user_service import UserService
from schemas.user_schema import UserSchema
from utils.logger import logger
from utils.decorators import require_auth

user_bp = Blueprint('users', __name__)
user_service = UserService()
user_schema = UserSchema()

@user_bp.route('/users', methods=['POST'])
@require_auth
def create_user():
    """Create a new user"""
    try:
        # Validate request data
        user_data = user_schema.load(request.json)
        
        # Create user
        user = user_service.create(user_data)
        
        # Log success
        logger.info(f'User created: {user.id}')
        
        # Return response
        return jsonify({
            'message': 'User created successfully',
            'data': user_schema.dump(user)
        }), 201
        
    except ValidationError as err:
        return jsonify({
            'error': 'Validation failed',
            'details': err.messages
        }), 400
        
    except ValueError as err:
        return jsonify({
            'error': str(err)
        }), 409
        
    except Exception as err:
        logger.error(f'Error creating user: {str(err)}')
        return jsonify({
            'error': 'Internal server error'
        }), 500

@user_bp.route('/users/<user_id>', methods=['GET'])
@require_auth
def get_user(user_id):
    """Get user by ID"""
    try:
        user = user_service.get_by_id(user_id)
        
        if not user:
            return jsonify({
                'error': 'User not found'
            }), 404
            
        return jsonify({
            'data': user_schema.dump(user)
        }), 200
        
    except Exception as err:
        logger.error(f'Error fetching user: {str(err)}')
        return jsonify({
            'error': 'Internal server error'
        }), 500
```

## 📄 Project Templates

### Node.js/Express API Template

```
project-name/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── models/          # Data models
│   ├── middleware/      # Custom middleware
│   ├── routes/          # Route definitions
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration
│   └── app.js           # Express app setup
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── package.json
├── README.md
└── server.js            # Entry point
```

### React Application Template

```
app-name/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   ├── contexts/       # React contexts
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── styles/         # Global styles
│   ├── App.tsx
│   └── index.tsx
├── tests/
│   └── __tests__/
├── .env.example
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

## 📋 Documentation Templates

### README Template

```markdown
# Project Name

Brief description of what this project does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+

## Installation

1. Clone the repository
   \`\`\`bash
   git clone <repo-url>
   cd project-name
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. Run database migrations
   \`\`\`bash
   npm run migrate
   \`\`\`

## Usage

\`\`\`bash
# Development
npm run dev

# Production
npm start

# Tests
npm test
\`\`\`

## API Documentation

See [API.md](./docs/API.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT
```

### API Documentation Template

```markdown
# API Name

Base URL: `https://api.example.com/v1`

## Authentication

All requests require an API key in the header:
\`\`\`
Authorization: Bearer <your-api-key>
\`\`\`

## Endpoints

### List Users

\`\`\`http
GET /users
\`\`\`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "pagination": {
    "page": 1,
    "totalPages": 5
  }
}
\`\`\`

### Create User

\`\`\`http
POST /users
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-10-16T10:00:00Z"
}
\`\`\`

## Error Responses

\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
\`\`\`
```

## 🔧 Utility Functions

### Retry Logic

```typescript
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError!;
}
```

### Debounce

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

---

*These templates and examples are starting points. Adapt them to your specific needs.*
