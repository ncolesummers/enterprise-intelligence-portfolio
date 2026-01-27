# Getting Started with Claude Code

Learn how to install and configure Claude Code for your development workflow.

## Prerequisites

- **Node.js 16+** (check with `node --version`)
- **Terminal/Command Line** access
- **Text editor or IDE** (VS Code, Cursor, etc.)
- **Git** (recommended for project integration)
- **Anthropic API access** (free tier available)

## Installation

### Method 1: NPM (Recommended)

```bash
npm install -g @anthropic-ai/claude-code
```

### Method 2: Direct Download

Visit [claude.ai/code](https://claude.ai/code) for platform-specific installers.

### Verify Installation

```bash
claude --version
# Should display: claude-code v1.x.x
```

## Initial Setup

### 1. Authentication

```bash
claude auth
# This will open your browser for authentication
# Follow the prompts to connect your Anthropic account
```

**Expected Output:**

```
✅ Successfully authenticated!
Welcome to Claude Code 👋
```

### 2. First Interactive Session

```bash
claude
# Starts interactive mode
```

You should see:

```
Claude Code v1.x.x
Type /help for commands, or start chatting!

>
```

### 3. Test Basic Functionality

Try these commands in the interactive session:

```
# Test basic interaction
> Hello! Can you help me understand how Claude Code works?

# Test file reading (if you have files in current directory)
> What files are in this directory?

# Exit interactive mode
> /exit
```

## Project Setup

### Initialize a Project

```bash
# Navigate to your project directory
cd your-project

# Initialize Claude Code for this project
claude init
```

This creates:

- `.claude/` directory with project configuration
- `CLAUDE.md` file for project-specific instructions

### Configure Project Memory

Edit the `CLAUDE.md` file to include project context:

```markdown
# Project: My Awesome App

This is a Next.js application with TypeScript.

## Architecture

- Frontend: Next.js 15 with App Router
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Testing: Playwright for E2E

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test:e2e` - Run E2E tests

## Coding Standards

- Use TypeScript strict mode
- Follow ESLint configuration
- Components should be client-side by default
- Use Tailwind for styling
```

## Your First Commands

### Interactive Mode

```bash
claude
```

**Common slash commands:**

- `/help` - Show available commands
- `/clear` - Clear conversation history
- `/memory` - Edit project memory (CLAUDE.md)
- `/exit` - Exit interactive mode

### One-Shot Mode

```bash
# Quick questions
claude -p "What's the best way to handle forms in React?"

# File analysis
claude -p "Review the code in src/components/Button.tsx"

# Code generation
claude -p "Create a TypeScript interface for a user profile"
```

## Essential Workflows

### Code Review

```bash
# Review specific file
claude -p "Please review src/app/page.tsx for best practices"

# Review recent changes
git diff HEAD~1 | claude -p "Review these changes"
```

### Bug Fixing

```bash
# Interactive debugging
claude
> I'm getting a TypeScript error in my component. Here's the error: [paste error]
```

### Documentation

```bash
# Generate documentation
claude -p "Create README documentation for the utils/validation.ts file"
```

## Configuration Options

### User Settings

Edit `~/.claude/settings.json`:

```json
{
  "model": "claude-3-7-sonnet-20250109",
  "outputFormat": "text",
  "theme": "dark",
  "notifications": true
}
```

### Project Settings

Edit `.claude/settings.json`:

```json
{
  "permissions": {
    "readFiles": true,
    "writeFiles": true,
    "executeCommands": false
  },
  "memory": {
    "autoLoad": true,
    "maxDepth": 5
  }
}
```

## Troubleshooting

### Command Not Found

```bash
# Check installation
which claude
# Should show path like: /usr/local/bin/claude

# Reinstall if needed
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

### Authentication Issues

```bash
# Clear and re-authenticate
claude auth --logout
claude auth
```

### Permission Errors

```bash
# Check and fix permissions
ls -la ~/.claude/
# Ensure you own the files

# Reset if needed
rm -rf ~/.claude/
claude auth
```

### Project Not Recognized

```bash
# Verify .claude directory exists
ls -la .claude/

# Reinitialize if needed
claude init --force
```

## Next Steps

Now that Claude Code is set up:

1. **[Learn Basic Commands →](02-basic-commands.md)** - Master daily workflows
2. **Explore Examples** - Check out [examples/simple-project/](examples/simple-project/)
3. **Join Community** - [GitHub Discussions](https://github.com/ncolesummers/enterprise-intelligence-portfolio/discussions)

## Tutorial Navigation

| Previous                         | Current             | Next                                     |
| -------------------------------- | ------------------- | ---------------------------------------- |
| [← Tutorial Overview](README.md) | **Getting Started** | [Basic Commands →](02-basic-commands.md) |

---

**✅ Checkpoint:** You should now have Claude Code installed, authenticated, and ready to use. Test it with `claude -p "Hello, Claude!"` before proceeding.
