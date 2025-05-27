# Custom Commands & Slash Commands

Learn to create powerful custom slash commands that transform Claude into specialized experts for your workflow.

## Understanding Custom Commands

Custom commands let you:
- Create reusable prompts with parameters
- Build specialized expert roles
- Standardize team workflows
- Automate complex prompt chains

## Command Structure

Custom commands are markdown files in specific directories:

```
.claude/commands/          # Project-specific commands
~/.claude/commands/        # Personal commands across all projects
```

### Command File Format

```markdown
# Command Title

Command description and instructions.

**Parameters**: $ARGUMENTS

Your prompt template here using $ARGUMENTS for dynamic input.
```

## Creating Your First Command

### 1. Simple Code Review Command

Create `.claude/commands/review-component.md`:

```markdown
# Component Review

Perform a comprehensive review of a React component.

**Component to Review**: $ARGUMENTS

Please review the following React component for:

1. **TypeScript Usage**: Proper types and interfaces
2. **React Best Practices**: Hooks, state management, lifecycle
3. **Performance**: Potential optimizations and memoization
4. **Accessibility**: ARIA attributes and keyboard navigation
5. **Code Quality**: Readability, maintainability, and patterns

Component: $ARGUMENTS

Provide specific suggestions with code examples where applicable.
```

**Usage:**
```bash
claude
> /project:review-component src/components/Button.tsx
```

### 2. Bug Fix Assistant

Create `.claude/commands/debug-issue.md`:

```markdown
# Debug Issue

Help diagnose and fix a specific issue.

**Issue Description**: $ARGUMENTS

I need help debugging this issue: $ARGUMENTS

Please:
1. Analyze the problem and identify potential root causes
2. Suggest debugging steps to isolate the issue
3. Provide specific solutions with code examples
4. Recommend preventive measures for the future

Focus on practical, actionable solutions.
```

**Usage:**
```bash
claude
> /project:debug-issue "React component not re-rendering when props change"
```

## Advanced: Role-Based Commands

Create specialized expert roles for different perspectives.

### Expert Role System

Create `~/.claude/commands/roles/` directory for reusable expert roles:

#### Senior Frontend Architect

Create `~/.claude/commands/roles/frontend-architect.md`:

```markdown
# Senior Frontend Architect Role

You are a Senior Frontend Architect with 15+ years of experience specializing in enterprise-scale applications. You have deep expertise in React, TypeScript, Next.js, and modern web architecture patterns.

**Your Responsibilities:**
- Design scalable component architectures
- Evaluate technical design decisions
- Ensure performance and maintainability
- Guide technology choices for frontend systems
- Establish development patterns and best practices

**Specific Task**: $ARGUMENTS

Please analyze this from an architectural perspective, considering:
1. Component structure and reusability patterns
2. State management architecture (React Query, Zustand, Context)
3. Performance implications and optimization strategies
4. Scalability and maintainability concerns
5. Integration patterns with backend systems
6. Testing architecture and developer experience

Provide specific architectural recommendations with implementation examples and trade-off analysis.
```

#### TypeScript Quality Engineer

Create `~/.claude/commands/roles/typescript-engineer.md`:

```markdown
# TypeScript Quality Engineer Role

You are a TypeScript Quality Engineer with 10+ years of experience in type-safe development and code quality assurance. You specialize in creating robust, maintainable TypeScript codebases.

**Your Responsibilities:**
- Ensure type safety and proper TypeScript usage
- Define coding standards and best practices
- Design error handling and validation strategies
- Optimize build processes and tooling
- Conduct thorough code reviews

**Specific Task**: $ARGUMENTS

Please analyze this from a code quality perspective, considering:
1. Type safety and interface design
2. Error handling and validation patterns
3. Code maintainability and readability
4. Performance implications of type choices
5. Testing strategies for type safety
6. Build and tooling optimization

Provide specific recommendations with code examples and best practice guidelines.
```

### Workflow Commands

Create commands that chain multiple expert perspectives.

#### Feature Development Workflow

Create `.claude/commands/workflows/feature-chain.md`:

```markdown
# Feature Development Chain

Guide a feature through multiple expert perspectives sequentially.

**Feature Description**: $ARGUMENTS

## Phase 1: Architecture Review
First, analyze this as a Senior Frontend Architect:
- Design technical architecture
- Define component structure
- Plan state management
- Consider performance implications

## Phase 2: Implementation Quality
Then, as a TypeScript Quality Engineer:
- Define type interfaces
- Plan error handling
- Ensure code quality standards
- Design testing approach

## Phase 3: Synthesis
Finally, provide a unified implementation plan with:
- Prioritized development steps
- Technical specifications
- Quality checkpoints
- Success criteria

**Feature to develop**: $ARGUMENTS
```

## Command Organization Strategies

### Project-Specific Commands

```
.claude/commands/
├── review/
│   ├── component.md        # Component-specific reviews
│   ├── api.md             # API endpoint reviews
│   └── security.md        # Security-focused reviews
├── generate/
│   ├── component.md       # Component generation
│   ├── test.md           # Test generation
│   └── docs.md           # Documentation generation
└── fix/
    ├── typescript.md      # TS error fixes
    ├── performance.md     # Performance issues
    └── accessibility.md   # A11y improvements
```

### Personal Commands

```
~/.claude/commands/
├── roles/
│   ├── architect.md       # Technical architect role
│   ├── reviewer.md        # Code reviewer role
│   └── mentor.md         # Mentoring role
├── workflows/
│   ├── daily-standup.md   # Daily workflow
│   ├── code-review.md     # Review process
│   └── feature-dev.md     # Feature development
└── quick/
    ├── explain.md         # Quick explanations
    ├── optimize.md        # Quick optimizations
    └── debug.md          # Quick debugging
```

## Advanced Command Features

### Dynamic Arguments

Use `$ARGUMENTS` for flexible input:

```markdown
# Multi-File Analysis

Analyze multiple files for consistency.

**Files to analyze**: $ARGUMENTS

Please compare these files: $ARGUMENTS

Look for:
- Inconsistent patterns
- Code duplication
- Different approaches to similar problems
- Opportunities for shared utilities
```

### Conditional Logic

```markdown
# Context-Aware Review

Provide different analysis based on file type.

**File to review**: $ARGUMENTS

Based on the file extension and content of $ARGUMENTS:

- If it's a component (.tsx/.jsx): Focus on React patterns and performance
- If it's a utility (.ts): Focus on pure functions and testing
- If it's a page/route: Focus on SEO, accessibility, and data fetching
- If it's configuration: Focus on security and maintainability

Provide specific recommendations for the detected file type.
```

### Command Chaining

```markdown
# Analysis Chain

Perform comprehensive analysis in stages.

**Target**: $ARGUMENTS

## Stage 1: Initial Assessment
First, provide a high-level overview of $ARGUMENTS

## Stage 2: Deep Dive
Then, analyze specific aspects:
- Architecture and design
- Code quality and patterns
- Performance considerations
- Security implications

## Stage 3: Recommendations
Finally, provide:
- Immediate action items
- Long-term improvements
- Risk assessment
- Success metrics
```

## Best Practices

### 1. Clear Naming Conventions
```bash
# ✅ Good names
/project:review:component
/project:generate:api-endpoint
/personal:roles:architect

# ❌ Unclear names
/project:thing
/personal:help
```

### 2. Detailed Instructions
```markdown
# ✅ Specific instructions
Analyze the React component for performance issues, focusing on:
1. Unnecessary re-renders
2. Missing memoization opportunities
3. Inefficient state updates
4. Heavy computation in render

# ❌ Vague instructions
Make this component better
```

### 3. Structured Output
```markdown
Provide analysis in this format:

## Summary
[High-level assessment]

## Issues Found
1. **Issue Name**: Description and impact
2. **Issue Name**: Description and impact

## Recommendations
1. **Priority 1**: Critical fixes
2. **Priority 2**: Important improvements
3. **Priority 3**: Nice-to-have enhancements

## Code Examples
[Specific code improvements]
```

### 4. Version Control
```bash
# Include commands in git for team sharing
git add .claude/commands/
git commit -m "Add custom review commands"

# Keep personal commands separate
echo ".claude/commands/personal/" >> .gitignore
```

## Real-World Examples

### Team Code Review

Create `.claude/commands/team/pr-review.md`:

```markdown
# Team PR Review

Comprehensive pull request review following team standards.

**PR to review**: $ARGUMENTS

Review this pull request: $ARGUMENTS

Evaluate against our team standards:

## Code Quality
- TypeScript usage and type safety
- Component patterns and architecture
- Error handling and edge cases
- Performance considerations

## Testing
- Test coverage for new features
- Test quality and maintainability
- Edge case coverage

## Documentation
- Code comments and JSDoc
- README updates if needed
- API documentation

## Security
- Input validation
- Authentication/authorization
- Data protection

Provide specific feedback with line numbers and code suggestions.
```

### Performance Optimization

Create `.claude/commands/optimize/performance.md`:

```markdown
# Performance Optimization

Analyze and optimize application performance.

**Target for optimization**: $ARGUMENTS

Optimize the performance of: $ARGUMENTS

## Analysis Areas
1. **Bundle Size**: Code splitting and tree shaking opportunities
2. **Runtime Performance**: Component rendering and state updates
3. **Network**: API calls, caching, and data fetching
4. **Memory**: Memory leaks and efficient data structures

## Deliverables
- Specific performance bottlenecks identified
- Concrete optimization recommendations
- Before/after performance metrics to track
- Implementation priority and effort estimates

Focus on high-impact, low-effort optimizations first.
```

## Testing Your Commands

### Command Validation
```bash
# Test command exists and loads
claude
> /project:review:component --help

# Test with sample input
> /project:review:component "src/components/Button.tsx"
```

### Iterative Improvement
1. **Start Simple**: Basic prompt template
2. **Test and Refine**: Use with real code
3. **Add Structure**: Improve output format
4. **Enhance Logic**: Add conditional analysis
5. **Document**: Add usage examples

## Next Steps

Now you can create powerful custom commands:

1. **[Learn Advanced Workflows →](04-advanced-workflows.md)** - Chain commands and automate complex tasks
2. **Build Your Command Library** - Create commands for your daily workflows
3. **Share with Team** - Standardize team practices with shared commands

## Tutorial Navigation

| Previous | Current | Next |
|----------|---------|------|
| [← Basic Commands](02-basic-commands.md) | **Custom Commands** | [Advanced Workflows →](04-advanced-workflows.md) |

---

**✅ Checkpoint:** You should now be able to create and use custom slash commands. Try creating a simple command for your most common workflow.