# Basic Commands

Master the essential Claude Code commands you'll use every day.

## Command Modes

Claude Code operates in two primary modes:

### Interactive Mode
Start a conversation session:
```bash
claude
```

**Best for:**
- Complex problem-solving
- Back-and-forth discussions
- Multi-step tasks
- Learning and exploration

### One-Shot Mode
Get quick answers:
```bash
claude -p "your question here"
```

**Best for:**
- Quick questions
- Code reviews
- Simple code generation
- Automated scripts

## Essential CLI Flags

### Core Flags
```bash
# Print mode (one-shot)
claude --print "question"
claude -p "question"          # Short form

# Continue last conversation
claude --continue

# Resume specific conversation
claude --resume

# Verbose output for debugging
claude --verbose

# Specify output format
claude --output-format json
claude --output-format stream-json
```

### Model Selection
```bash
# Use specific model
claude --model claude-3-5-sonnet-20241022

# List available models
claude models list
```

## Interactive Mode Commands

Once in interactive mode (`claude`), use these slash commands:

### Essential Slash Commands
```bash
# Get help
/help

# Clear conversation history
/clear

# Exit interactive mode
/exit

# Edit project memory
/memory

# Review code
/review

# Enter vim-like editing mode
/vim
```

### Memory Management
```bash
# Quick memory addition (start message with #)
# This is a quick way to add to project memory

# Edit memory files directly
/memory              # Edit project CLAUDE.md
/memory --user       # Edit user CLAUDE.md
```

## Common Workflows

### 1. Code Review

**Single File Review:**
```bash
# One-shot review
claude -p "Review src/components/Button.tsx for best practices"

# Interactive review
claude
> Can you review the Button component in src/components/Button.tsx?
> Focus on TypeScript usage and React patterns.
```

**Git Changes Review:**
```bash
# Review staged changes
git diff --staged | claude -p "Review these changes before I commit"

# Review recent commits
git show HEAD | claude -p "Analyze this commit for potential issues"

# Review pull request
gh pr diff 123 | claude -p "Review this PR for security and performance"
```

### 2. Code Generation

**Component Creation:**
```bash
claude -p "Create a TypeScript React component for a loading spinner with Tailwind CSS"
```

**Utility Functions:**
```bash
claude -p "Create a utility function to validate email addresses with proper TypeScript types"
```

**Configuration Files:**
```bash
claude -p "Generate a Playwright configuration for testing a Next.js app"
```

### 3. Debugging

**Error Analysis:**
```bash
# Copy error message and get help
claude -p "I'm getting this TypeScript error: [paste error]. How do I fix it?"
```

**Interactive Debugging:**
```bash
claude
> I have a bug in my React component where the state isn't updating properly.
> Here's the component code: [paste code]
> The issue is that clicking the button doesn't increment the counter.
```

### 4. Documentation

**README Generation:**
```bash
claude -p "Create a README.md for my Next.js portfolio project"
```

**Code Documentation:**
```bash
claude -p "Add JSDoc comments to this function: [paste function]"
```

**API Documentation:**
```bash
claude -p "Document the API endpoints in src/app/api/ directory"
```

### 5. Testing

**Test Generation:**
```bash
claude -p "Create Playwright tests for the contact form component"
```

**Test Analysis:**
```bash
claude -p "Analyze my test failures and suggest improvements: [paste test output]"
```

## Advanced Input Techniques

### Multiline Input
```bash
# In interactive mode, use \ for multiline
> This is a long question that spans \
  multiple lines and requires \
  detailed explanation

# Or use Option+Enter (Mac) / Shift+Enter (Windows/Linux)
```

### File References
```bash
# Claude automatically reads files when mentioned
claude -p "Optimize the performance of src/components/Dashboard.tsx"

# Multiple files
claude -p "Compare src/utils/auth.ts and src/utils/validation.ts for consistency"
```

### Context Preservation
```bash
# Continue previous conversation
claude --continue

# Resume and select from conversation history
claude --resume
```

## Configuration Management

### Project Configuration
```bash
# View current settings
claude config list

# Set project-specific settings
claude config set permissions.writeFiles true
claude config set model claude-3-5-sonnet-20241022

# View configuration file
cat .claude/settings.json
```

### User Configuration
```bash
# Global user settings
claude config set --user theme dark
claude config set --user notifications true

# View user config
cat ~/.claude/settings.json
```

## Working with Images

Claude Code can analyze images in interactive mode:

```bash
claude
# Then drag and drop an image, or:
> Can you analyze this screenshot of my app? [paste image]
> What improvements can you suggest for this UI mockup?
```

**Supported formats:** PNG, JPEG, GIF, WebP

## Practical Examples

### Daily Development Workflow
```bash
# Morning setup
claude --continue  # Resume yesterday's conversation

# Code review before commit
git add .
git diff --staged | claude -p "Review my changes"

# Quick debugging
claude -p "Why is my React component not re-rendering?"

# End of day documentation
claude -p "Summarize the changes I made today and update the CHANGELOG"
```

### Team Collaboration
```bash
# Explain code to teammates
claude -p "Explain how the authentication system works in src/lib/auth.ts"

# Code review for PR
gh pr diff 42 | claude -p "Provide detailed code review feedback"

# Onboarding help
claude -p "Create onboarding instructions for new developers joining this project"
```

## Best Practices

### 1. Be Specific
```bash
# ❌ Vague
claude -p "Fix my code"

# ✅ Specific
claude -p "Fix the TypeScript error in src/components/Button.tsx line 23"
```

### 2. Provide Context
```bash
# ❌ No context
claude -p "How do I handle forms?"

# ✅ With context
claude -p "How do I handle forms in a Next.js 15 app with TypeScript and React Hook Form?"
```

### 3. Use Project Memory
```bash
# Add project-specific information to CLAUDE.md
# This helps Claude understand your project context
/memory
```

### 4. Leverage Conversation History
```bash
# Continue conversations for related tasks
claude --continue

# Instead of starting fresh each time
```

## Keyboard Shortcuts

**Interactive Mode:**
- `Ctrl+C` - Cancel current operation
- `Ctrl+D` - Exit (alternative to `/exit`)
- `Option+Enter` (Mac) / `Shift+Enter` (Windows/Linux) - Multiline input
- `↑/↓` - Navigate command history

## Next Steps

Now that you understand basic commands:

1. **[Create Custom Commands →](03-custom-commands.md)** - Build your own slash commands
2. **Practice** - Try the workflows with your own code
3. **Explore** - Check out [examples/](examples/) for real scenarios

## Tutorial Navigation

| Previous | Current | Next |
|----------|---------|------|
| [← Getting Started](01-getting-started.md) | **Basic Commands** | [Custom Commands →](03-custom-commands.md) |

---

**✅ Checkpoint:** You should now be comfortable with basic Claude Code operations. Try reviewing a file in your project: `claude -p "Review [filename] for improvements"`