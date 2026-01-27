# Advanced Workflows

Master complex automation patterns and enterprise-scale development workflows with Claude Code.

## Multi-Role Workflows

Combine multiple expert perspectives for comprehensive analysis and decision-making.

### Sequential Role Chains

Process tasks through multiple expert roles in sequence, with each role building on the previous analysis.

#### Example: Feature Development Chain

```bash
claude
# Phase 1: Product Strategy
> /personal:roles:product-manager "Analyze user requirements for a real-time notification system"

# Phase 2: Technical Architecture (using output from Phase 1)
> /personal:roles:frontend-architect "Design technical architecture for real-time notifications based on: [previous output]"

# Phase 3: Implementation Quality (using outputs from Phases 1-2)
> /personal:roles:typescript-engineer "Define implementation standards and type safety for: [combined previous outputs]"

# Phase 4: Testing Strategy (using all previous outputs)
> /personal:roles:sdet "Create comprehensive testing strategy for: [all previous analysis]"
```

### Parallel Role Analysis

Get simultaneous input from multiple experts on the same problem.

#### Example: Code Review Team

**Set up parallel analysis commands:**

Create `.claude/commands/workflows/parallel-review.md`:

```markdown
# Parallel Code Review

Get simultaneous expert perspectives on code changes.

**Code to Review**: $ARGUMENTS

## Security Perspective

As a Cybersecurity Engineer, analyze: $ARGUMENTS
Focus on security vulnerabilities, authentication patterns, and data protection.

## Architecture Perspective

As a Senior Frontend Architect, analyze: $ARGUMENTS
Focus on component design, performance, and scalability.

## Quality Perspective

As a TypeScript Quality Engineer, analyze: $ARGUMENTS
Focus on type safety, code quality, and maintainability.

## Synthesis

Combine all three perspectives into unified recommendations with:

1. Priority rankings for identified issues
2. Conflicting recommendations resolved
3. Implementation roadmap
4. Quality gates for verification
```

### Context Handoff Between Roles

Efficiently transfer context and decisions between different expert roles.

Create `.claude/commands/workflows/context-handoff.md`:

```markdown
# Context Handoff

Transfer analysis context from one role to another.

**Previous Analysis**: $ARGUMENTS

## Context Summary

Based on the previous analysis: $ARGUMENTS

### Key Decisions Made

- Technical decisions and rationale
- Business constraints identified
- Quality requirements established
- Risk assessments completed

### Open Questions for Next Role

- Implementation specifics needed
- Trade-off evaluations required
- Validation approaches to consider

### Constraints to Maintain

- Technical limitations to respect
- Business requirements to preserve
- Quality standards to uphold

Next role should focus on: [specific areas for the receiving role]
```

## Git Integration Workflows

Integrate Claude Code into your Git workflow for automated code review and improvement.

### Pre-Commit Review

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Get staged changes
STAGED_CHANGES=$(git diff --staged --name-only)

if [ -n "$STAGED_CHANGES" ]; then
    echo "Reviewing staged changes with Claude Code..."

    # Review changes
    git diff --staged | claude -p "Review these changes for:
    1. Code quality and best practices
    2. Potential bugs or issues
    3. Security vulnerabilities
    4. Performance implications

    Provide specific feedback with line numbers."
fi
```

### Automated PR Analysis

```bash
# Analyze pull request
PR_NUMBER=123
gh pr diff $PR_NUMBER | claude -p "Comprehensive PR review:

## Analysis Areas
1. Architecture and design decisions
2. Code quality and TypeScript usage
3. Security considerations
4. Testing coverage
5. Documentation updates

## Deliverables
- Approval recommendation (approve/request changes/needs discussion)
- Specific improvement suggestions
- Risk assessment
- Quality verification checklist"
```

### Commit Message Generation

```bash
# Generate semantic commit messages
git add .
COMMIT_MSG=$(git diff --staged | claude -p "Generate a semantic commit message for these changes:

Format: type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Keep description under 50 characters
Include body if significant changes")

echo "Suggested commit message:"
echo "$COMMIT_MSG"
```

## Continuous Integration Workflows

Integrate Claude Code into CI/CD pipelines for automated quality checks.

### GitHub Actions Integration

Create `.github/workflows/claude-review.yml`:

```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Authenticate Claude
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: claude auth --api-key $ANTHROPIC_API_KEY

      - name: Review PR Changes
        run: |
          git diff origin/main...HEAD | claude -p "Review this PR:

          Focus on:
          1. Breaking changes
          2. Security vulnerabilities  
          3. Performance regressions
          4. Test coverage gaps

          Provide actionable feedback." > review-output.md

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review-output.md', 'utf8');

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🤖 Claude Code Review\n\n${review}`
            });
```

### Quality Gates

Set up automated quality checks with Claude Code.

Create `.claude/commands/ci/quality-gate.md`:

```markdown
# Quality Gate Analysis

Perform comprehensive quality assessment for CI/CD pipeline.

**Changes to Analyze**: $ARGUMENTS

Analyze the following changes: $ARGUMENTS

## Quality Criteria

### Code Quality (Weight: 30%)

- TypeScript usage and type safety
- Code complexity and maintainability
- Design patterns and architecture
- Error handling and edge cases

### Security (Weight: 25%)

- Vulnerability scanning
- Authentication/authorization
- Data validation and sanitization
- Dependency security

### Performance (Weight: 20%)

- Runtime performance impact
- Bundle size implications
- Memory usage patterns
- Database query efficiency

### Testing (Weight: 15%)

- Test coverage for new code
- Test quality and reliability
- Integration test scenarios
- Edge case coverage

### Documentation (Weight: 10%)

- Code documentation
- API documentation updates
- README and setup instructions
- Changelog updates

## Quality Score

Provide a quality score (0-100) with:

- Overall assessment
- Category-specific scores
- Blocking issues (if any)
- Recommended actions
- Approval status (PASS/FAIL/NEEDS_REVIEW)
```

## Team Collaboration Workflows

Standardize team practices with shared workflows and commands.

### Onboarding Automation

Create `.claude/commands/team/onboard-developer.md`:

```markdown
# Developer Onboarding

Generate comprehensive onboarding materials for new team members.

**Developer Context**: $ARGUMENTS

Create onboarding materials for: $ARGUMENTS

## Welcome Package

1. **Project Overview**
   - Architecture summary
   - Technology stack explanation
   - Development workflow overview
   - Team practices and standards

2. **Setup Instructions**
   - Environment setup checklist
   - Required tools and versions
   - Configuration steps
   - Verification procedures

3. **First Week Tasks**
   - Starter issues to work on
   - Code exploration exercises
   - Team introduction schedule
   - Learning resources

4. **Resources and Contacts**
   - Documentation links
   - Team contact information
   - Support channels
   - Emergency procedures

Tailor the content to the developer's experience level and role.
```

### Knowledge Transfer

Create `.claude/commands/team/knowledge-transfer.md`:

```markdown
# Knowledge Transfer Session

Generate documentation for knowledge transfer between team members.

**Transfer Topic**: $ARGUMENTS

Create knowledge transfer documentation for: $ARGUMENTS

## Transfer Structure

### Context and Background

- Problem domain explanation
- Historical decisions and rationale
- Current state assessment
- Known limitations and constraints

### Technical Deep Dive

- Architecture and design patterns
- Key components and their interactions
- Data flow and state management
- Integration points and dependencies

### Operational Knowledge

- Deployment procedures
- Monitoring and alerting
- Troubleshooting guides
- Performance optimization tips

### Handoff Checklist

- Code repositories and access
- Documentation and resources
- Contacts and escalation paths
- Outstanding tasks and priorities

### Q&A Session Planning

- Common questions and answers
- Areas requiring clarification
- Follow-up session scheduling
```

## Performance Optimization Workflows

Systematic approaches to performance analysis and optimization.

### Performance Audit

Create `.claude/commands/performance/audit.md`:

```markdown
# Performance Audit

Comprehensive performance analysis and optimization recommendations.

**Target for Audit**: $ARGUMENTS

Perform performance audit on: $ARGUMENTS

## Audit Areas

### Frontend Performance

1. **Bundle Analysis**
   - Bundle size and composition
   - Code splitting opportunities
   - Tree shaking effectiveness
   - Dependency optimization

2. **Runtime Performance**
   - Component rendering efficiency
   - State update patterns
   - Memory usage and leaks
   - Event handler optimization

3. **Network Performance**
   - API call optimization
   - Caching strategies
   - Resource loading patterns
   - CDN utilization

### Backend Performance

1. **Database Performance**
   - Query optimization
   - Index effectiveness
   - Connection pooling
   - Caching strategies

2. **API Performance**
   - Endpoint response times
   - Payload optimization
   - Rate limiting
   - Error handling efficiency

## Optimization Roadmap

Provide prioritized recommendations with:

- Performance impact estimates
- Implementation effort assessments
- Risk evaluations
- Success metrics
```

## Security Workflow Integration

Integrate security analysis into development workflows.

### Security Review Process

Create `.claude/commands/security/review-process.md`:

```markdown
# Security Review Process

Systematic security analysis for code changes.

**Changes to Review**: $ARGUMENTS

Security review for: $ARGUMENTS

## Security Analysis Framework

### OWASP Top 10 Assessment

1. Injection vulnerabilities
2. Broken authentication
3. Sensitive data exposure
4. XML external entities (XXE)
5. Broken access control
6. Security misconfiguration
7. Cross-site scripting (XSS)
8. Insecure deserialization
9. Known vulnerable components
10. Insufficient logging/monitoring

### Threat Modeling

- Attack surface analysis
- Data flow security
- Trust boundary evaluation
- Privilege escalation risks

### Compliance Check

- GDPR compliance
- SOX requirements
- Industry-specific standards
- Internal security policies

## Security Recommendations

Provide:

- Risk severity ratings
- Mitigation strategies
- Implementation guidance
- Verification procedures
```

## Best Practices for Advanced Workflows

### 1. Workflow Documentation

```markdown
# Document each workflow with:

- Purpose and use cases
- Prerequisites and setup
- Step-by-step execution
- Expected outputs
- Troubleshooting guide
```

### 2. Error Handling

```bash
# Add error handling to scripts
set -e  # Exit on error

if ! command -v claude &> /dev/null; then
    echo "Claude Code not installed"
    exit 1
fi

if ! claude auth status &> /dev/null; then
    echo "Claude Code not authenticated"
    exit 1
fi
```

### 3. Logging and Monitoring

```bash
# Log workflow executions
LOG_FILE="~/.claude/workflow.log"
echo "$(date): Starting workflow: $WORKFLOW_NAME" >> $LOG_FILE

# Monitor execution time
START_TIME=$(date +%s)
# ... workflow execution ...
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
echo "Workflow completed in ${DURATION}s" >> $LOG_FILE
```

### 4. Version Control for Workflows

```bash
# Include workflows in version control
git add .claude/commands/
git add .github/workflows/
git commit -m "Add advanced Claude Code workflows"

# Tag workflow versions
git tag -a v1.0-workflows -m "Initial workflow release"
```

## Next Steps

You now have advanced workflow capabilities:

1. **[Learn Best Practices →](05-best-practices.md)** - Optimize your Claude Code usage
2. **Implement Team Workflows** - Set up shared processes
3. **Monitor and Iterate** - Continuously improve your workflows

## Tutorial Navigation

| Previous                                   | Current                | Next                                     |
| ------------------------------------------ | ---------------------- | ---------------------------------------- |
| [← Custom Commands](03-custom-commands.md) | **Advanced Workflows** | [Best Practices →](05-best-practices.md) |

---

**✅ Checkpoint:** You should now be able to create complex, multi-stage workflows that combine multiple expert perspectives and integrate with your development tools.
