# CI/CD Strategy

## Overview

This document outlines the Continuous Integration and Continuous Deployment strategy for the enterprise intelligence portfolio. Our CI/CD pipeline is designed to balance thorough testing with FormSpree API rate limits while maintaining high code quality.

## GitHub Actions Workflows

### 1. PR Quality Checks (`pr-checks`)

**Triggers**: Pull requests to `main` branch  
**Duration**: ~3-5 minutes  
**Purpose**: Fast feedback for code quality and UI functionality

**Steps**:
- Type checking with TypeScript
- ESLint code quality checks
- Production build verification
- UI behavior tests (mocked FormSpree responses)
- API health checks (no rate limits)

**Rate Limit Strategy**: Uses mocked FormSpree responses to avoid consuming API quota during development.

### 2. Build and Test (`build-and-test`)

**Triggers**: Pushes to `main` or `develop` branches  
**Duration**: ~5-8 minutes  
**Purpose**: Comprehensive testing for deployment-ready code

**Steps**:
- Full type checking and linting
- Production build
- Complete E2E test suite
- Cross-browser compatibility testing (Chromium, Firefox, WebKit)
- Integration health checks

**Artifacts**: Test results stored for 30 days for debugging

### 3. Weekly Integration Tests (`weekly-integration`)

**Triggers**: Scheduled weekly on Sundays at 2 AM UTC  
**Duration**: ~10-15 minutes  
**Purpose**: Full FormSpree API integration verification

**Features**:
- Real FormSpree API testing with `TEST_INTEGRATION=true`
- Email delivery verification
- Rate limit detection and handling
- Automatic issue creation on failure
- Long-term result storage (90 days)

**Rate Limit Management**: Runs only once weekly to conserve FormSpree's 50 requests/month limit, allowing ~12 requests/month for CI with buffer for manual testing.

### 4. Post-Deploy Verification (`post-deploy-verification`)

**Triggers**: After successful main branch deployment  
**Duration**: ~2-3 minutes  
**Purpose**: Production environment validation

**Checks**:
- Deployment completion verification
- Production smoke tests
- Vercel Analytics integration
- Basic health check endpoints

## Environment Variables

### Required for CI
```bash
# GitHub Actions automatically provides these
GITHUB_TOKEN=<automatic>
CI=true

# For full integration tests (daily only)
TEST_INTEGRATION=true  # Set only for scheduled runs
```

### Production Environment
```bash
# Vercel deployment variables
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=<automatic>
BASE_URL=https://enterprise-intelligence-portfolio.vercel.app
```

## Test Strategy Mapping

### PR Development Cycle
```
1. Developer creates PR
2. pr-checks runs (3-5 min)
   ├── Type checking ✓
   ├── Linting ✓
   ├── Build verification ✓
   ├── UI tests (mocked) ✓
   └── API health check ✓
3. Fast feedback to developer
4. Merge when checks pass
```

### Main Branch Deployment
```
1. Code merged to main
2. build-and-test runs (5-8 min)
   ├── Comprehensive testing ✓
   ├── Cross-browser testing ✓
   └── Integration health checks ✓
3. Vercel auto-deploys
4. post-deploy-verification runs (2-3 min)
   ├── Production smoke tests ✓
   ├── Analytics verification ✓
   └── Health checks ✓
```

### Weekly Monitoring
```
1. Scheduled 2 AM UTC Sundays
2. weekly-integration runs (10-15 min)
   ├── Real FormSpree API tests ✓
   ├── Email delivery verification ✓
   └── Rate limit monitoring ✓
3. Auto-issue creation if fails
4. Long-term trend monitoring
```

## Failure Handling

### PR Check Failures
- **Type Errors**: Block merge until fixed
- **Lint Issues**: Block merge until fixed
- **Build Failures**: Block merge until fixed
- **UI Test Failures**: Block merge, investigate test changes
- **API Health Check**: Warning only, may indicate FormSpree issues

### Integration Test Failures
- **Weekly Test Failure**: Automatically creates GitHub issue
- **Rate Limit Hit**: Expected behavior, logged for monitoring
- **Real API Failures**: Indicates FormSpree service issues

### Production Deployment Issues
- **Smoke Test Failures**: Manual investigation required
- **Analytics Issues**: Non-blocking warning
- **Health Check Failures**: May indicate deployment problems

## Monitoring and Alerts

### Automated Issue Creation
Weekly integration failures automatically create GitHub issues with:
- Failure timestamp and run ID
- Commit hash for debugging
- Suggested investigation steps
- Relevant labels for triage

### Test Result Artifacts
- **PR Results**: 7-day retention for quick debugging
- **Main Branch Results**: 30-day retention for release validation
- **Weekly Integration**: 90-day retention for trend analysis

## Rate Limit Management

### FormSpree Free Tier Limits
- **50 submissions/month**: Approximately 12 requests/week
- **Strategy**: Weekly integration tests only
- **Mitigation**: Mocked responses for development

### Rate Limit Monitoring
```bash
# Weekly budget calculation
Monthly Limit: 50 requests
Weekly Budget: ~12 requests
Actual Usage: 1 request/week (weekly integration)
Buffer: 11 requests for manual testing and development
```

### Escalation Plan
If rate limits are exceeded:
1. **Immediate**: Switch to mocked-only testing
2. **Short-term**: Reduce weekly test frequency or skip integration tests
3. **Long-term**: Consider FormSpree paid plan or alternative service

## Performance Benchmarks

### CI Pipeline Performance
- **PR Checks**: Target < 5 minutes
- **Full Build**: Target < 8 minutes
- **Weekly Integration**: Target < 15 minutes
- **Post-Deploy**: Target < 3 minutes

### Test Execution Times
- **UI Behavior Tests**: ~2-3 minutes
- **Integration Health**: ~30 seconds
- **Cross-Browser**: ~4-5 minutes
- **Real API Tests**: ~2-3 minutes

## Future Enhancements

### Planned Improvements
- [ ] **Unit Test Integration**: Add Jest/RTL tests to PR checks
- [ ] **Visual Regression**: Implement screenshot comparison
- [ ] **Performance Testing**: Lighthouse CI integration
- [ ] **Security Scanning**: SAST/dependency vulnerability checks

### Advanced Features
- [ ] **Multi-Environment**: Staging environment testing
- [ ] **Load Testing**: Stress testing for high traffic
- [ ] **A11y Testing**: Automated accessibility validation
- [ ] **API Testing**: Dedicated FormSpree test endpoints

## Maintenance Schedule

### Weekly
- [ ] Review test execution times
- [ ] Check artifact storage usage
- [ ] Monitor FormSpree rate limit consumption

### Monthly  
- [ ] Update dependencies in workflow
- [ ] Review and optimize CI performance
- [ ] Analyze test failure patterns
- [ ] FormSpree usage audit

### Quarterly
- [ ] Evaluate CI/CD tool alternatives
- [ ] Review and update testing strategy
- [ ] Performance benchmark review
- [ ] Security audit of CI pipeline