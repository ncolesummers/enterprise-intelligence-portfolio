# Real-World Examples

Explore practical, tested examples of Claude Code usage in real development scenarios.

## Example Projects

### 💻 [Simple Project Setup](simple-project/)

**Skill Level:** Beginner | **Time:** 30 minutes

Learn the basics with a simple Node.js project setup, including:

- Initial Claude Code configuration
- Basic file analysis and review
- Simple custom commands
- Git integration workflow

**What you'll learn:**

- Project initialization with Claude Code
- File reading and analysis
- Basic prompt patterns
- Version control integration

---

### 🌐 [Web Application Development](web-app/)

**Skill Level:** Intermediate | **Time:** 1-2 hours

Advanced workflow with a Next.js application, featuring:

- Multi-role expert analysis
- Automated code review workflows
- Performance optimization
- Testing strategy implementation

**What you'll learn:**

- Complex project memory management
- Role-based command systems
- CI/CD integration patterns
- Team collaboration workflows

---

### 🚀 [Open Source Contribution](open-source/)

**Skill Level:** Advanced | **Time:** 2+ hours

Contribute to open source projects using Claude Code:

- External project analysis
- Contribution workflow automation
- Documentation generation
- Community standards compliance

**What you'll learn:**

- External codebase analysis
- Contribution quality standards
- Documentation automation
- Community best practices

---

## Quick Reference Examples

### Daily Development Tasks

#### Morning Standup Preparation

```bash
# Review yesterday's changes
git log --since="yesterday" --oneline | claude -p "Summarize yesterday's development progress for standup"

# Check for any issues
claude -p "Analyze recent commits for potential issues or blockers"
```

#### Code Review Before Commit

```bash
# Review staged changes
git diff --staged | claude -p "Review these changes for:
1. Code quality and best practices
2. Potential bugs or edge cases
3. Performance implications
4. Security considerations"
```

#### Bug Investigation

```bash
# Analyze error logs
claude -p "Help debug this error: [paste error message]
Project context: Next.js 15 with TypeScript and Tailwind CSS"

# Interactive debugging session
claude
> I'm seeing unexpected behavior in my React component
> [Describe the issue and share relevant code]
```

#### Documentation Generation

```bash
# Generate API documentation
claude -p "Create comprehensive API documentation for src/app/api/contact/route.ts"

# Update README
claude -p "Update the README.md to reflect recent changes to the project structure"
```

### Team Collaboration

#### Pull Request Review

```bash
# Comprehensive PR analysis
gh pr diff 42 | claude -p "Provide detailed code review focusing on:
1. Architecture and design decisions
2. Type safety and error handling
3. Test coverage and quality
4. Security implications
5. Performance impact"
```

#### Knowledge Transfer

```bash
# Document component for handoff
claude -p "Create detailed documentation for the ContactForm component to help new team members understand:
1. Purpose and functionality
2. Props and API
3. State management approach
4. Testing strategy
5. Known limitations"
```

#### Onboarding Support

```bash
# Generate onboarding checklist
claude -p "Create an onboarding checklist for new developers joining this Next.js project"

# Explain architecture to new team member
claude -p "Explain the overall architecture of this portfolio website to a new senior developer"
```

### Performance Optimization

#### Bundle Analysis

```bash
# Analyze bundle composition
claude -p "Analyze the package.json dependencies and suggest optimizations for:
1. Bundle size reduction
2. Performance improvements
3. Unnecessary dependencies
4. Security updates needed"
```

#### Component Optimization

```bash
# Optimize React component
claude -p "Optimize src/components/ProjectGrid.tsx for performance:
1. Identify re-rendering issues
2. Suggest memoization opportunities
3. Analyze prop drilling
4. Recommend state management improvements"
```

### Testing and Quality Assurance

#### Test Generation

```bash
# Generate comprehensive tests
claude -p "Create Playwright E2E tests for the contact form with scenarios:
1. Successful form submission
2. Validation error handling
3. Network error scenarios
4. Accessibility testing
5. Cross-browser compatibility"
```

#### Test Analysis

```bash
# Analyze test failures
claude -p "Analyze these test failures and suggest fixes: [paste test output]"

# Improve test coverage
claude -p "Review test coverage for src/components/ContactForm.tsx and suggest additional test cases"
```

## Command Examples by Category

### Code Review Commands

```bash
# Component review
/project:review:component "src/components/Button.tsx"

# Security review
/project:review:security "src/app/api/contact/route.ts"

# Performance review
/project:review:performance "src/components/ProjectGrid.tsx"

# Accessibility review
/project:review:accessibility "src/components/ContactForm.tsx"
```

### Generation Commands

```bash
# Component generation
/project:generate:component "Create a loading spinner component with Tailwind CSS"

# Test generation
/project:generate:test "Create tests for the theme toggle functionality"

# Documentation generation
/project:generate:docs "Document the validation utilities in src/lib/validation.ts"

# Configuration generation
/project:generate:config "Create ESLint configuration for TypeScript and React"
```

### Workflow Commands

```bash
# Daily workflow
/project:workflows:daily "Review today's development tasks and priorities"

# Feature development
/project:workflows:feature "Plan implementation of user authentication system"

# Bug fixing workflow
/project:workflows:bugfix "Systematic approach to fixing form validation issues"

# Deployment workflow
/project:workflows:deploy "Pre-deployment checklist and verification"
```

## Integration Examples

### Git Hooks

```bash
# .git/hooks/pre-commit
#!/bin/bash
git diff --staged | claude -p "Quick review of staged changes for obvious issues"
```

### GitHub Actions

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Review Changes
        run: |
          git diff origin/main...HEAD | claude -p "Review PR changes"
```

### VS Code Integration

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Claude Review Current File",
      "type": "shell",
      "command": "claude -p 'Review ${file} for best practices'",
      "group": "build"
    }
  ]
}
```

## Learning Path Recommendations

### For Beginners

1. Start with [Simple Project Setup](simple-project/)
2. Practice basic commands with your own code
3. Create your first custom commands
4. Integrate with Git workflow

### For Intermediate Users

1. Explore [Web Application Development](web-app/)
2. Implement role-based command system
3. Set up automated workflows
4. Integrate with CI/CD pipeline

### For Advanced Users

1. Study [Open Source Contribution](open-source/)
2. Create complex multi-role workflows
3. Develop team standards and practices
4. Contribute to community command libraries

## Next Steps

- **Choose an Example** - Pick the example that matches your skill level
- **Practice Daily** - Integrate Claude Code into your regular workflow
- **Share Knowledge** - Contribute successful patterns back to the community
- **Stay Updated** - Follow Claude Code updates and new features

## Tutorial Navigation

| Previous                                    | Current      | Next                                |
| ------------------------------------------- | ------------ | ----------------------------------- |
| [← Best Practices](../05-best-practices.md) | **Examples** | [Simple Project →](simple-project/) |

---

**Ready to practice?** Choose an example that matches your experience level and dive in!
