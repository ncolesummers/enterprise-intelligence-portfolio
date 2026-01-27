# Test Plan

## Overview

This document outlines the comprehensive testing strategy for the enterprise intelligence portfolio website. Our testing approach follows a three-tier strategy to ensure quality while managing external API rate limits.

## Testing Architecture

### 1. Unit Testing

**Status**: Not implemented yet  
**Framework**: Jest + React Testing Library (planned)  
**Scope**: Component logic, utilities, form validation

```bash
# Planned commands
pnpm test          # Run unit tests
pnpm test:watch    # Watch mode for development
pnpm test:coverage # Generate coverage report
```

### 2. End-to-End Testing

**Status**: ✅ Implemented  
**Framework**: Playwright  
**Scope**: User workflows, UI interactions, form behavior

#### Current Test Suites

**UI Behavior Tests** (`tests/e2e/contact-form.spec.ts`)

- Form validation (required fields, email format, length constraints)
- Loading states and user feedback
- Success/error state handling
- Cross-browser compatibility (Chromium, Firefox, WebKit)

**Navigation Tests** (`tests/e2e/navigation.spec.ts`)

- Page routing and navigation
- Mobile responsiveness
- Keyboard navigation and accessibility
- Header consistency across pages

**Integration Tests** (`tests/e2e/contact-form-integration.spec.ts`)

- FormSpree API health checks
- Endpoint configuration verification
- Optional full integration testing (manual trigger)

### 3. Integration Testing Strategy

To balance thorough testing with FormSpree rate limiting, we use a hybrid approach:

#### Tier 1: Always Run (No Rate Limits)

- **API Health Check**: Verifies FormSpree service availability
- **Endpoint Configuration**: Confirms correct API endpoint setup
- **Mocked Responses**: Tests UI behavior with simulated API responses

#### Tier 2: Manual Trigger (Full Integration)

- **Real API Testing**: Tests actual email delivery
- **Rate Limit Handling**: Graceful degradation when limits hit
- **Environment Variable**: `TEST_INTEGRATION=true` to enable

#### Tier 3: Scheduled CI (GitHub Actions)

- **Daily Integration**: Runs full tests once per day
- **PR Smoke Tests**: Quick health checks on pull requests
- **Production Validation**: Post-deployment verification

## Test Commands

```bash
# Standard E2E test suite (mocked integration)
pnpm test:e2e

# Run specific test file
pnpm test:e2e tests/e2e/contact-form.spec.ts

# Full integration tests (use sparingly)
TEST_INTEGRATION=true pnpm test:e2e tests/e2e/contact-form-integration.spec.ts

# Generate test report
pnpm test:e2e --reporter=html

# Debug mode (headed browser)
pnpm test:e2e --headed --debug
```

## CI/CD Integration

### GitHub Actions Workflow Plan

**PR Checks** (Fast feedback)

```yaml
- Lint and type checking
- Build verification
- UI behavior tests (mocked)
- API health checks
```

**Weekly Integration** (Comprehensive)

```yaml
- Full E2E test suite
- Real FormSpree integration tests
- Cross-browser compatibility
- Performance testing
```

**Post-Deploy Validation**

```yaml
- Smoke tests on production
- Form submission verification
- Analytics integration check
```

## Test Data Management

### Email Testing

- **Development**: Uses FormSpree test endpoint
- **Testing**: Unique timestamps to avoid conflicts
- **Production**: Rate-limited real submissions

### Test Fixtures

- Email configuration in `tests/fixtures/email-config.ts`
- Page URLs and selectors centralized
- Reusable test utilities for common actions

## Quality Gates

### Before Merge

- [ ] All UI behavior tests pass
- [ ] API health check passes
- [ ] Build completes successfully
- [ ] Linting and type checking pass

### Before Release

- [ ] Full integration test suite passes
- [ ] Cross-browser compatibility verified
- [ ] Form submission to real endpoint tested
- [ ] Performance benchmarks met

## Test Environment Setup

### Local Development

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install

# Run development server for testing
pnpm dev

# Run tests in another terminal
pnpm test:e2e
```

### CI Environment

- Node.js 18+
- Playwright with all browsers
- Environment variables for API keys
- Parallel test execution
- Test result artifacts

## Monitoring and Maintenance

### Test Health

- Monitor test execution time
- Track flaky test patterns
- Regular dependency updates
- FormSpree API status monitoring

### Coverage Goals

- **UI Components**: 80%+ coverage (planned)
- **Critical Paths**: 100% E2E coverage
- **Integration Points**: Full API coverage
- **Accessibility**: WCAG 2.1 AA compliance

## Known Issues and Limitations

### Current Challenges

1. **FormSpree Rate Limiting**: 50 requests/month on free tier
2. **Request Interception**: Some Playwright request mocking issues
3. **Test Isolation**: Shared FormSpree endpoint across tests

### Mitigation Strategies

1. **Hybrid Testing**: Mix of mocked and real API tests
2. **Scheduled Testing**: Daily CI runs for full integration
3. **Test Data Isolation**: Unique identifiers for each test run

## Future Enhancements

### Planned Improvements

- [ ] Unit test implementation with Jest
- [ ] Visual regression testing
- [ ] Performance testing with Lighthouse CI
- [ ] A11y testing with axe-playwright
- [ ] API testing with dedicated test endpoints

### Advanced Features

- [ ] Load testing for high traffic scenarios
- [ ] Email delivery verification
- [ ] Analytics event tracking tests
- [ ] Progressive Web App testing
