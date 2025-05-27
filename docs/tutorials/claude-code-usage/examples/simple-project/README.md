# Simple Project Setup Example

A beginner-friendly example showing Claude Code basics with a simple Node.js project.

## Overview

This example demonstrates:
- Setting up Claude Code for a new project
- Basic file analysis and code review
- Creating simple custom commands
- Git workflow integration

## Project Structure

```
simple-project/
├── package.json
├── src/
│   ├── index.js
│   └── utils.js
├── .claude/
│   ├── commands/
│   │   └── review-file.md
│   └── settings.json
├── CLAUDE.md
└── README.md
```

## Step-by-Step Walkthrough

### 1. Project Initialization

```bash
# Create project directory
mkdir simple-project
cd simple-project

# Initialize npm project
npm init -y

# Initialize Claude Code
claude init
```

### 2. Configure Project Memory

Edit `CLAUDE.md`:

```markdown
# Simple Node.js Project

A basic Node.js application for learning Claude Code.

## Technology Stack
- Node.js
- ES6+ JavaScript
- NPM for package management

## Project Goals
- Learn Claude Code basics
- Practice code review workflows
- Implement simple utilities

## Coding Standards
- Use ES6+ features
- Write clear, documented code
- Follow Node.js best practices
```

### 3. Create Sample Code

Create `src/index.js`:

```javascript
const { greet, calculateSum } = require('./utils');

console.log(greet('World'));
console.log('Sum:', calculateSum([1, 2, 3, 4, 5]));
```

Create `src/utils.js`:

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

module.exports = { greet, calculateSum };
```

### 4. Basic Claude Code Usage

```bash
# Review a file
claude -p "Review src/utils.js for best practices and improvements"

# Get help with Node.js patterns
claude -p "How can I improve the error handling in src/index.js?"

# Generate documentation
claude -p "Create JSDoc comments for the functions in src/utils.js"
```

### 5. Create Custom Command

Create `.claude/commands/review-file.md`:

```markdown
# File Review Command

Review a JavaScript file for Node.js best practices.

**File to review**: $ARGUMENTS

Please review this Node.js file: $ARGUMENTS

Focus on:
1. Code quality and readability
2. Error handling
3. Performance considerations
4. Node.js best practices
5. Documentation quality

Provide specific suggestions with code examples.
```

Usage:
```bash
claude
> /project:review-file "src/utils.js"
```

### 6. Git Integration

```bash
# Initialize git
git init
git add .
git commit -m "Initial project setup"

# Review changes before commit
git add src/utils.js
git diff --staged | claude -p "Review these changes before I commit"

# Generate commit message
git diff --staged | claude -p "Generate a semantic commit message for these changes"
```

## Learning Outcomes

After completing this example, you'll understand:

✅ **Basic Setup**: How to initialize Claude Code in a project  
✅ **File Analysis**: How to get code reviews and suggestions  
✅ **Custom Commands**: How to create reusable command templates  
✅ **Git Integration**: How to use Claude Code in your Git workflow  
✅ **Project Memory**: How to provide context for better results  

## Next Steps

1. **Experiment**: Try different prompts with your own code
2. **Extend**: Create more custom commands for your workflow
3. **Advance**: Move on to [Web Application Development](../web-app/)

## Common Patterns

### Code Review
```bash
# Review specific concerns
claude -p "Check src/utils.js for potential security issues"

# Compare implementations
claude -p "Compare these two functions and suggest the better approach: [paste code]"
```

### Code Generation
```bash
# Generate tests
claude -p "Create Jest tests for the functions in src/utils.js"

# Generate documentation
claude -p "Create a README.md for this simple Node.js project"
```

### Debugging
```bash
# Debug issues
claude -p "I'm getting this error: [paste error]. Help me debug it."

# Explain code
claude -p "Explain how the reduce function works in src/utils.js"
```

---

**✅ Try it yourself**: Set up this simple project and practice the basic Claude Code workflows!