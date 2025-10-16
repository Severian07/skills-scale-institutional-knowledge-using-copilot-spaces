# Troubleshooting Guide

Common issues and their solutions.

## 📚 Contents

- [Development Environment Issues](#development-environment-issues)
- [Git & Version Control Issues](#git--version-control-issues)
- [Build & Deployment Issues](#build--deployment-issues)
- [Runtime Issues](#runtime-issues)
- [Database Issues](#database-issues)
- [Performance Issues](#performance-issues)

## 🔧 Development Environment Issues

### Issue: Node modules not found

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**
1. Install dependencies:
   ```bash
   npm install
   ```

2. Clear cache and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check Node version:
   ```bash
   node --version  # Should be 18+
   ```

### Issue: Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
1. Find and kill the process (Mac/Linux):
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. Find and kill the process (Windows):
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

3. Use a different port:
   ```bash
   PORT=3001 npm start
   ```

### Issue: Environment variables not loading

**Symptoms:**
- Variables are undefined
- App crashes with missing config

**Solutions:**
1. Check `.env` file exists:
   ```bash
   cp .env.example .env
   ```

2. Verify dotenv is loaded:
   ```javascript
   require('dotenv').config();
   ```

3. Restart your development server

### Issue: Python virtual environment issues

**Symptoms:**
```
ModuleNotFoundError: No module named 'flask'
```

**Solutions:**
1. Activate virtual environment:
   ```bash
   source venv/bin/activate  # Mac/Linux
   venv\Scripts\activate     # Windows
   ```

2. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

3. Recreate virtual environment:
   ```bash
   rm -rf venv
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## 🌿 Git & Version Control Issues

### Issue: Merge conflicts

**Symptoms:**
```
CONFLICT (content): Merge conflict in src/app.js
```

**Solutions:**
1. View conflicting files:
   ```bash
   git status
   ```

2. Open files and resolve conflicts:
   ```javascript
   <<<<<<< HEAD
   // Your changes
   =======
   // Their changes
   >>>>>>> branch-name
   ```

3. Mark as resolved:
   ```bash
   git add <resolved-file>
   git commit
   ```

### Issue: Accidentally committed to wrong branch

**Solutions:**
1. Move commit to correct branch:
   ```bash
   git log  # Note the commit hash
   git checkout correct-branch
   git cherry-pick <commit-hash>
   git checkout wrong-branch
   git reset --hard HEAD~1
   ```

### Issue: Need to undo last commit

**Solutions:**
1. Keep changes (soft reset):
   ```bash
   git reset --soft HEAD~1
   ```

2. Discard changes (hard reset):
   ```bash
   git reset --hard HEAD~1
   ```

3. Already pushed (use revert):
   ```bash
   git revert HEAD
   git push
   ```

### Issue: Git authentication failed

**Solutions:**
1. Check SSH key:
   ```bash
   ssh -T git@github.com
   ```

2. Generate new SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your@email.com"
   cat ~/.ssh/id_ed25519.pub  # Add to GitHub
   ```

3. Use HTTPS with token:
   ```bash
   git remote set-url origin https://github.com/user/repo.git
   ```

## 🏗️ Build & Deployment Issues

### Issue: Build fails with memory error

**Symptoms:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solutions:**
1. Increase Node memory:
   ```bash
   NODE_OPTIONS=--max_old_space_size=4096 npm run build
   ```

2. Add to package.json:
   ```json
   {
     "scripts": {
       "build": "NODE_OPTIONS=--max_old_space_size=4096 react-scripts build"
     }
   }
   ```

### Issue: Tests fail in CI but pass locally

**Solutions:**
1. Check Node version matches:
   ```yaml
   # .github/workflows/test.yml
   - uses: actions/setup-node@v3
     with:
       node-version: '18'
   ```

2. Clear CI cache

3. Check for timezone-dependent tests

4. Run tests with same environment variables

### Issue: Docker container won't start

**Symptoms:**
```
Error: Cannot connect to the Docker daemon
```

**Solutions:**
1. Start Docker:
   ```bash
   # Mac/Linux
   sudo systemctl start docker
   
   # Or Docker Desktop
   open -a Docker
   ```

2. Check container logs:
   ```bash
   docker logs <container-id>
   ```

3. Rebuild container:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

## 🚀 Runtime Issues

### Issue: API returns 500 error

**Solutions:**
1. Check server logs:
   ```bash
   tail -f logs/error.log
   ```

2. Enable debug mode:
   ```bash
   DEBUG=* npm start
   ```

3. Check error details:
   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: err.message });
   });
   ```

### Issue: CORS errors in browser

**Symptoms:**
```
Access to fetch at 'http://api...' has been blocked by CORS policy
```

**Solutions:**
1. Add CORS middleware:
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: 'http://localhost:3000'
   }));
   ```

2. Configure in Nginx:
   ```nginx
   add_header Access-Control-Allow-Origin *;
   add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE";
   ```

### Issue: Authentication not working

**Solutions:**
1. Check token in request:
   ```javascript
   console.log('Token:', req.headers.authorization);
   ```

2. Verify token expiration

3. Check token format:
   ```
   Authorization: Bearer <token>
   ```

4. Validate token secret matches

## 💾 Database Issues

### Issue: Cannot connect to database

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**
1. Check database is running:
   ```bash
   # PostgreSQL
   pg_isready
   
   # MySQL
   mysql -u root -p
   ```

2. Verify connection string:
   ```
   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
   ```

3. Check firewall rules

### Issue: Migration fails

**Solutions:**
1. Rollback last migration:
   ```bash
   npm run migrate:rollback
   ```

2. Check migration SQL:
   ```bash
   npm run migrate:status
   ```

3. Reset database (development only):
   ```bash
   npm run migrate:reset
   ```

### Issue: Query too slow

**Solutions:**
1. Add database index:
   ```sql
   CREATE INDEX idx_user_email ON users(email);
   ```

2. Analyze query:
   ```sql
   EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
   ```

3. Use pagination:
   ```sql
   SELECT * FROM users LIMIT 20 OFFSET 0;
   ```

## ⚡ Performance Issues

### Issue: Application is slow

**Solutions:**
1. Profile the code:
   ```bash
   node --prof app.js
   ```

2. Check for N+1 queries:
   ```javascript
   // Bad
   users.forEach(user => {
     user.orders = await getOrders(user.id);
   });
   
   // Good
   const userIds = users.map(u => u.id);
   const orders = await getOrdersByUserIds(userIds);
   ```

3. Add caching:
   ```javascript
   const cache = require('redis').createClient();
   
   const cachedData = await cache.get(key);
   if (cachedData) return JSON.parse(cachedData);
   
   const data = await fetchData();
   await cache.setex(key, 3600, JSON.stringify(data));
   ```

4. Enable compression:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

### Issue: Memory leaks

**Solutions:**
1. Profile memory:
   ```bash
   node --inspect app.js
   # Open chrome://inspect
   ```

2. Check for event listener leaks:
   ```javascript
   // Always remove listeners
   emitter.removeListener('event', handler);
   ```

3. Clear timers:
   ```javascript
   const timer = setInterval(() => {}, 1000);
   clearInterval(timer);
   ```

## 🆘 Getting More Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Search the knowledge base
3. Google the error message
4. Check Stack Overflow
5. Review related PRs/issues

### When Asking for Help

Include:
- **Error message** (full stack trace)
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details** (OS, versions)
- **What you've tried**

### Where to Ask

- **Team Chat**: Quick questions
- **GitHub Issues**: Bug reports
- **Team Meeting**: Complex issues
- **1:1 with Mentor**: Learning questions

## 📚 Additional Resources

- [Stack Overflow](https://stackoverflow.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

*Troubleshooting is a skill. Each issue you solve makes you better at it.*
