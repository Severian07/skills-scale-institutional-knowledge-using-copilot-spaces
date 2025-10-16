# API Design Principles

Guidelines for designing consistent, scalable, and developer-friendly APIs.

## 🎯 Core Principles

### RESTful Design
Follow REST principles for HTTP APIs:
- Use proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Use HTTP status codes correctly
- Resource-oriented URLs
- Stateless communication

### Consistency
- Use consistent naming conventions
- Follow the same patterns across all endpoints
- Maintain backward compatibility

### Developer Experience
- Clear and predictable
- Well-documented
- Helpful error messages
- Easy to discover and learn

## 🛣️ URL Structure

### Resource Naming
```
# Use nouns, not verbs
✓ GET /api/users
✓ GET /api/users/123
✗ GET /api/getUsers
✗ GET /api/user/get/123

# Use plural nouns for collections
✓ GET /api/products
✗ GET /api/product

# Use kebab-case for multi-word resources
✓ GET /api/user-profiles
✗ GET /api/userProfiles

# Nested resources for relationships
✓ GET /api/users/123/orders
✓ GET /api/orders/456/items
```

### Versioning
```
# Use version prefix
✓ /api/v1/users
✓ /api/v2/users

# Or version in header
Accept: application/vnd.api.v1+json
```

## 📝 HTTP Methods

### GET - Retrieve Resources
```
GET /api/users           # List all users
GET /api/users/123       # Get specific user
GET /api/users?role=admin&status=active  # With filters
```

### POST - Create Resources
```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}

Response: 201 Created
Location: /api/users/123
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-10-16T10:00:00Z"
}
```

### PUT - Replace Resource
```
PUT /api/users/123
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@example.com"
}

Response: 200 OK
```

### PATCH - Partial Update
```
PATCH /api/users/123
Content-Type: application/json

{
  "email": "newemail@example.com"
}

Response: 200 OK
```

### DELETE - Remove Resource
```
DELETE /api/users/123

Response: 204 No Content
```

## 📊 Request & Response Format

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "preferences": {
    "notifications": true,
    "theme": "dark"
  }
}
```

### Response Body
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "preferences": {
    "notifications": true,
    "theme": "dark"
  },
  "createdAt": "2025-10-16T10:00:00Z",
  "updatedAt": "2025-10-16T10:00:00Z"
}
```

### Collection Response
```json
{
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalCount": 100
  },
  "links": {
    "self": "/api/users?page=1",
    "next": "/api/users?page=2",
    "last": "/api/users?page=5"
  }
}
```

## 🔢 HTTP Status Codes

### Success Codes
- **200 OK**: Request succeeded (GET, PUT, PATCH)
- **201 Created**: Resource created (POST)
- **204 No Content**: Success with no body (DELETE)

### Client Error Codes
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource conflict (duplicate)
- **422 Unprocessable Entity**: Validation failed

### Server Error Codes
- **500 Internal Server Error**: Unexpected server error
- **503 Service Unavailable**: Server temporarily unavailable

## ⚠️ Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ],
    "requestId": "abc123xyz",
    "timestamp": "2025-10-16T10:00:00Z"
  }
}
```

### Error Codes
Use consistent error codes:
```
VALIDATION_ERROR
AUTHENTICATION_REQUIRED
PERMISSION_DENIED
RESOURCE_NOT_FOUND
RESOURCE_CONFLICT
RATE_LIMIT_EXCEEDED
INTERNAL_ERROR
```

## 🔍 Filtering, Sorting, Pagination

### Filtering
```
GET /api/users?status=active
GET /api/users?role=admin&department=engineering
GET /api/products?price[gte]=100&price[lte]=500
```

### Sorting
```
GET /api/users?sort=name
GET /api/users?sort=-createdAt  # Descending
GET /api/users?sort=name,-createdAt  # Multiple fields
```

### Pagination
```
# Offset-based
GET /api/users?page=2&pageSize=20

# Cursor-based
GET /api/users?cursor=abc123&limit=20
```

### Field Selection
```
GET /api/users?fields=id,name,email
```

## 🔐 Authentication & Authorization

### Authentication Header
```
Authorization: Bearer <access_token>
```

### API Key (for public APIs)
```
X-API-Key: <api_key>
```

## 📅 Date & Time

- Use ISO 8601 format: `2025-10-16T10:00:00Z`
- Always use UTC timezone
- Include timezone indicator

```json
{
  "createdAt": "2025-10-16T10:00:00Z",
  "scheduledAt": "2025-10-17T14:30:00Z"
}
```

## 🏷️ Naming Conventions

### Field Names
```json
{
  "userId": 123,           // camelCase for JSON
  "firstName": "John",
  "lastName": "Doe",
  "isActive": true,
  "createdAt": "2025-10-16T10:00:00Z"
}
```

### Boolean Fields
```
isActive, hasAccess, canEdit (use positive names)
```

## 📚 Documentation

### OpenAPI/Swagger
Document all endpoints using OpenAPI specification:

```yaml
/api/users:
  get:
    summary: List users
    parameters:
      - name: status
        in: query
        schema:
          type: string
          enum: [active, inactive]
    responses:
      200:
        description: Success
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserList'
```

### Examples in Documentation
- Include request/response examples
- Show error scenarios
- Provide code samples

## ⚡ Performance

### Rate Limiting
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1634392800
```

### Caching
```
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

### Compression
```
Accept-Encoding: gzip, deflate
Content-Encoding: gzip
```

## ✅ API Design Checklist

- [ ] RESTful resource naming
- [ ] Proper HTTP methods and status codes
- [ ] Consistent error handling
- [ ] Pagination for collections
- [ ] Filtering and sorting support
- [ ] Authentication/authorization
- [ ] Rate limiting
- [ ] Versioning strategy
- [ ] Complete documentation
- [ ] Request/response examples
- [ ] Error scenarios documented

## 📖 References

- [REST API Tutorial](https://restfulapi.net/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Roy Fielding's Dissertation on REST](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

---

*Well-designed APIs are a pleasure to use and maintain.*
