# Playwright E2E Testing Plan

This document outlines the testing strategy for the enterprise intelligence portfolio using Playwright for end-to-end testing.

## Overview

The testing plan focuses on verifying core functionality, user interactions, and data integrity - particularly around the contact form email verification issue discovered with iCloud+ interference.

## Test Structure

### Test Organization
```
tests/
├── e2e/
│   ├── contact-form.spec.ts       # Contact form validation & submission
│   ├── navigation.spec.ts         # Page navigation and routing
│   ├── accessibility.spec.ts      # A11y compliance tests
│   └── performance.spec.ts        # Core Web Vitals and loading
└── fixtures/
    ├── test-data.ts              # Test data and configurations
    └── email-config.ts           # Email verification settings
```

## Priority 1: Contact Form Testing

### Email Address Verification
**Primary Goal**: Verify the correct email address is submitted to FormSpree, bypassing any iCloud+ interference.

#### Test Cases
1. **Form Submission Data Integrity**
   - Intercept network requests to FormSpree endpoint
   - Verify submitted email matches expected recipient
   - Configurable test email addresses via environment variables

2. **Form Validation**
   - Test required field validation (name, email, message)
   - Test email format validation
   - Test character limits (name: 2-100, message: 10-1000)
   - Test zod schema error messages

3. **Form State Management**
   - Test loading state during submission
   - Test success state and form reset
   - Test error state handling
   - Test disabled button during submission

4. **Cross-Browser Email Handling**
   - Test form submission in Chrome, Firefox, Safari
   - Test mobile browsers (iOS Safari, Chrome Mobile)
   - Verify no browser-specific email rewriting occurs

### Configuration Options
```typescript
// Environment variables for test configuration
interface EmailTestConfig {
  expectedRecipient: string;      // nate@ncolesummers.com
  formspreeEndpoint: string;      // https://formspree.io/f/xeogbrzn
  testSenderEmail: string;        // test email for form submission
  enableNetworkInterception: boolean; // capture actual requests
}
```

## Priority 2: Core Navigation Testing

### Page Loading and Routing
1. **Homepage Components**
   - Header renders correctly
   - Hero section loads
   - Project grid displays all projects
   - Contact section is accessible
   - Footer renders

2. **Project Pages**
   - Individual project pages load (`/projects/mikrotik-config-gen`, etc.)
   - Navigation between projects works
   - Back navigation functions correctly

3. **About Page**
   - About page loads and renders content
   - Header component functions consistently

### Focus Management & Accessibility
1. **Skip to Content**
   - Skip link appears on focus
   - Skip link navigates to main content
   - Keyboard navigation works properly

2. **Reduced Motion Support**
   - Test with `prefers-reduced-motion: reduce`
   - Verify animations are disabled/reduced
   - Ensure smooth scrolling respects user preferences

## Priority 3: Error Boundary Testing

### Error Handling
1. **Component Error Recovery**
   - Trigger JavaScript errors in components
   - Verify error boundary catches errors
   - Test error boundary fallback UI
   - Test "Try again" functionality

2. **Network Error Handling**
   - Simulate FormSpree API failures
   - Test offline scenarios
   - Verify user-friendly error messages

## Priority 4: Performance Testing

### Core Web Vitals
1. **Loading Performance**
   - Measure Largest Contentful Paint (LCP)
   - Measure First Input Delay (FID)
   - Measure Cumulative Layout Shift (CLS)

2. **Image Optimization**
   - Verify Next.js Image component usage
   - Test responsive image loading
   - Check image format optimization (WebP/AVIF)

## Test Configuration

### Browser Matrix
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: iOS Safari, Chrome Mobile
- **Environments**: Development, Production build

### Environment Variables
```bash
# .env.test
PLAYWRIGHT_BASE_URL=http://localhost:3000
EXPECTED_EMAIL_RECIPIENT=nate@ncolesummers.com
FORMSPREE_ENDPOINT=https://formspree.io/f/xeogbrzn
TEST_EMAIL=test@example.com
ENABLE_EMAIL_VERIFICATION=true
```

### Test Scripts (package.json)
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed",
    "test:contact-form": "playwright test contact-form.spec.ts"
  }
}
```

## Network Interception Strategy

### FormSpree Request Monitoring
```typescript
// Intercept and verify FormSpree submissions
await page.route('https://formspree.io/f/xeogbrzn', async (route, request) => {
  const postData = request.postData();
  const submittedData = JSON.parse(postData);
  
  // Verify email recipient is correct
  expect(submittedData.email).toBe(expectedEmail);
  
  // Allow request to continue or mock response
  await route.continue();
});
```

### Email Verification Flow
1. **Setup**: Configure expected email recipient
2. **Intercept**: Capture FormSpree API requests
3. **Verify**: Check submitted data matches expectations
4. **Report**: Log any email address discrepancies
5. **Continue/Mock**: Allow real submission or return mock response

## Success Criteria

### Contact Form
- ✅ Correct email address submitted to FormSpree (no iCloud+ interference)
- ✅ Form validation works across all browsers
- ✅ Success/error states function properly
- ✅ Form resets after successful submission

### Navigation & Accessibility
- ✅ All pages load within 2 seconds
- ✅ Keyboard navigation works throughout site
- ✅ Skip to content link functions properly
- ✅ Reduced motion preferences respected

### Error Handling
- ✅ Error boundaries catch and display friendly messages
- ✅ Network errors handled gracefully
- ✅ Users can recover from error states

### Performance
- ✅ LCP < 2.5 seconds
- ✅ FID < 100ms
- ✅ CLS < 0.1

## Implementation Timeline

1. **Phase 1** (Priority): Contact form email verification tests
2. **Phase 2**: Navigation and accessibility tests  
3. **Phase 3**: Error boundary and performance tests
4. **Phase 4**: Comprehensive cross-browser testing

## Debugging Features

### Visual Testing
- Screenshot comparison for UI regression testing
- Video recording of failed tests
- Trace viewer for debugging complex interactions

### Network Debugging
- HAR file generation for network analysis
- Request/response logging
- FormSpree API response validation

---

*Plan created: 5/25/2025*  
*Status: Ready for implementation*  
*Next: Create test directory structure and implement Priority 1 tests*