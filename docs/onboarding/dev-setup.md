# Development Environment Setup

This guide will help you set up your development environment to work on our projects.

## Prerequisites

Before you begin, ensure you have:
- Administrative access to your machine
- Company email configured
- VPN access (if working remotely)
- Access to the GitHub organization

## 🛠️ Required Tools

### Version Control
- **Git**: [Download Git](https://git-scm.com/downloads)
  ```bash
  git --version  # Should be 2.30+
  ```

### Code Editor/IDE
- **VS Code** (recommended): [Download VS Code](https://code.visualstudio.com/)
  - Install recommended extensions (see below)
- **Alternative IDEs**: IntelliJ IDEA, PyCharm, or your preferred IDE

### Runtime & Package Managers
Choose based on your project:

**For JavaScript/TypeScript projects:**
- **Node.js**: [Download Node.js](https://nodejs.org/) (LTS version)
  ```bash
  node --version  # Should be v18+
  npm --version   # Should be v9+
  ```

**For Python projects:**
- **Python**: [Download Python](https://www.python.org/) (3.9+)
  ```bash
  python --version  # Should be 3.9+
  pip --version
  ```

**For Java projects:**
- **JDK**: [Download JDK](https://adoptium.net/) (Java 17+)
  ```bash
  java --version  # Should be 17+
  ```

## 🔧 Configuration

### Git Configuration

Set up your Git identity:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
```

Configure Git defaults:
```bash
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global core.autocrlf input  # or 'true' on Windows
```

Set up SSH keys for GitHub:
```bash
ssh-keygen -t ed25519 -C "your.email@company.com"
# Add the key to your GitHub account
```

### VS Code Extensions

Install these recommended extensions:

**Essential:**
- GitLens
- GitHub Pull Requests
- GitHub Copilot
- ESLint (for JavaScript/TypeScript)
- Prettier - Code formatter

**Language Specific:**
- Python (for Python projects)
- Language Support for Java (for Java projects)
- Go (for Go projects)

**Optional but Helpful:**
- Docker
- Remote - SSH
- Live Share

### IDE Settings

Create a `.vscode/settings.json` in your workspace:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

## 📦 Project Setup

### Clone Repositories

1. Navigate to your workspace directory:
   ```bash
   cd ~/workspace  # or your preferred location
   ```

2. Clone the main repository:
   ```bash
   git clone git@github.com:organization/repository.git
   cd repository
   ```

3. Install dependencies:
   
   **Node.js:**
   ```bash
   npm install
   ```
   
   **Python:**
   ```bash
   pip install -r requirements.txt
   # or
   poetry install
   ```
   
   **Java:**
   ```bash
   ./mvnw install
   # or
   ./gradlew build
   ```

### Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your local settings
   - Database connection strings
   - API keys (get from team)
   - Service URLs

3. Never commit `.env` files!

## ✅ Verification

Run these commands to verify your setup:

```bash
# Check Git
git --version

# Check runtime
node --version  # or python --version, java --version

# Run tests
npm test  # or python -m pytest, ./mvnw test

# Start development server
npm run dev  # or python manage.py runserver

# Run linter
npm run lint  # or pylint src/
```

## 🐳 Docker Setup (Optional)

If the project uses Docker:

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Start the containers:
   ```bash
   docker-compose up -d
   ```

3. Verify containers are running:
   ```bash
   docker-compose ps
   ```

## 🔍 Troubleshooting

### Common Issues

**Issue: npm install fails**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

**Issue: Port already in use**
- Find the process: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
- Kill the process or use a different port

**Issue: Permission denied**
- Check file permissions
- Use `sudo` only if absolutely necessary
- On Windows, run terminal as administrator

**Issue: Git authentication fails**
- Verify SSH key is added to GitHub
- Test: `ssh -T git@github.com`
- Use HTTPS as fallback with personal access token

## 📚 Next Steps

After completing setup:

1. Review the [coding standards](../standards/coding-standards.md)
2. Understand the [git workflow](../processes/git-workflow.md)
3. Read the [architecture documentation](../architecture/README.md)
4. Pick your first task from the [starter tasks](./first-tasks.md)

## 🆘 Getting Help

If you're stuck:
- Check the [troubleshooting guide](../troubleshooting/README.md)
- Ask in the team chat
- Reach out to your mentor
- Schedule time with a senior developer

---

**Setup complete?** Mark it off in your [onboarding checklist](./checklist.md)!
