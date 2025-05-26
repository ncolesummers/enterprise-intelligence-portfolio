import { test, expect } from '@playwright/test';
import { emailTestConfig } from '../fixtures/email-config';
import { validFormData, invalidFormData } from '../fixtures/test-data';

test.describe('Contact Form - UI Behavior', () => {
  test.beforeEach(async ({ page }) => {
    // Mock FormSpree API for consistent multi-browser testing
    await page.route('**/formspree.io/**', async (route) => {
      // Simulate successful FormSpree response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          ok: true,
          next: 'https://formspree.io/thanks',
          submissionText: 'Thank you!'
        }),
      });
    });

    await page.goto('/');
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test.describe('Email Verification', () => {
    test('should submit correct email address to FormSpree', async ({ page }) => {
      // Track network requests to FormSpree
      const formspreeRequests: any[] = [];
      
      // Override the global mock to capture request data
      await page.route(emailTestConfig.formspreeEndpoint, async (route, request) => {
        const postData = request.postData();
        if (postData) {
          try {
            const submittedData = JSON.parse(postData);
            formspreeRequests.push(submittedData);
          } catch (e) {
            // If not JSON, store raw data
            formspreeRequests.push({ raw: postData });
          }
        }
        
        // Return successful response
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
      });

      // Fill out and submit the form
      await page.fill('#name', emailTestConfig.testSenderName);
      await page.fill('#email', emailTestConfig.testSenderEmail);
      await page.fill('#message', emailTestConfig.testMessage);
      
      // Submit the form
      await page.click('button[type="submit"]');
      
      // Wait for loading state to complete
      await expect(page.locator('button[type="submit"]')).not.toContainText('Sending...');
      
      // Verify request was made
      expect(formspreeRequests).toHaveLength(1);
      
      const submittedData = formspreeRequests[0];
      
      // Verify the correct data was submitted
      expect(submittedData.name).toBe(emailTestConfig.testSenderName);
      expect(submittedData.email).toBe(emailTestConfig.testSenderEmail);
      expect(submittedData.message).toBe(emailTestConfig.testMessage);
      
      // Log the submitted data for debugging email issues
      console.log('FormSpree submission data:', submittedData);
      
      // Verify success message appears
      await expect(page.locator('text=Thanks for your message')).toBeVisible();
    });

    test('should verify FormSpree endpoint configuration', async ({ page }) => {
      // Check that the form action points to the correct endpoint
      const expectedEndpoint = emailTestConfig.formspreeEndpoint;
      let requestUrl = '';
      
      // Override global mock to capture URL
      await page.route('**/formspree.io/**', async (route, request) => {
        requestUrl = request.url();
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
      });
      
      // Submit form
      await page.fill('#name', 'Test User');
      await page.fill('#email', 'test@example.com');
      await page.fill('#message', 'Test message for endpoint verification');
      await page.click('button[type="submit"]');
      
      // Wait for form submission
      await expect(page.locator('button[type="submit"]')).not.toContainText('Sending...');
      
      // Verify correct endpoint was called
      expect(requestUrl).toBe(expectedEndpoint);
      console.log('Verified FormSpree endpoint:', requestUrl);
    });
  });

  test.describe('Form Validation', () => {
    test('should validate required fields', async ({ page }) => {
      // Submit empty form
      await page.click('button[type="submit"]');
      
      // Check that HTML5 validation prevents submission
      const nameField = page.locator('#name');
      const emailField = page.locator('#email');
      const messageField = page.locator('#message');
      
      await expect(nameField).toHaveAttribute('required');
      await expect(emailField).toHaveAttribute('required');
      await expect(messageField).toHaveAttribute('required');
    });

    test('should validate email format', async ({ page }) => {
      await page.fill('#name', validFormData.name);
      await page.fill('#email', invalidFormData.invalidEmail.email);
      await page.fill('#message', validFormData.message);
      
      await page.click('button[type="submit"]');
      
      // Should show validation error
      await expect(page.locator('text=Please enter a valid email address')).toBeVisible({ timeout: 5000 });
    });

    test('should validate name length constraints', async ({ page }) => {
      // Test short name
      await page.fill('#name', invalidFormData.shortName.name);
      await page.fill('#email', validFormData.email);
      await page.fill('#message', validFormData.message);
      
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible({ timeout: 5000 });
      
      // Clear and test long name
      await page.fill('#name', invalidFormData.longName.name);
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Name too long')).toBeVisible({ timeout: 5000 });
    });

    test('should validate message length constraints', async ({ page }) => {
      // Test short message
      await page.fill('#name', validFormData.name);
      await page.fill('#email', validFormData.email);
      await page.fill('#message', invalidFormData.shortMessage.message);
      
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible({ timeout: 5000 });
      
      // Clear and test long message
      await page.fill('#message', invalidFormData.longMessage.message);
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Message too long')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Form State Management', () => {
    test('should show loading state during submission', async ({ page }) => {
      // Override global mock with slow response to see loading state
      await page.route('**/formspree.io/**', async (route) => {
        // Delay response to simulate slow network
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
      });
      
      await page.fill('#name', validFormData.name);
      await page.fill('#email', validFormData.email);
      await page.fill('#message', validFormData.message);
      
      // Submit and immediately check for loading state
      await page.click('button[type="submit"]');
      await expect(page.locator('button[type="submit"]')).toContainText('Sending...');
      await expect(page.locator('button[type="submit"]')).toBeDisabled();
      
      // Wait for completion
      await expect(page.locator('button[type="submit"]')).toContainText('Send Message');
      await expect(page.locator('button[type="submit"]')).toBeEnabled();
    });

    test('should reset form after successful submission', async ({ page }) => {
      // Use the global mock (no need to override for this test)
      
      // Fill and submit form
      await page.fill('#name', validFormData.name);
      await page.fill('#email', validFormData.email);
      await page.fill('#message', validFormData.message);
      await page.click('button[type="submit"]');
      
      // Wait for success message
      await expect(page.locator('text=Thanks for your message')).toBeVisible();
      
      // Verify form fields are cleared
      await expect(page.locator('#name')).toHaveValue('');
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#message')).toHaveValue('');
    });

    test('should handle network errors gracefully', async ({ page }) => {
      // Mock network error
      await page.route(emailTestConfig.formspreeEndpoint, async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' }),
        });
      });
      
      await page.fill('#name', validFormData.name);
      await page.fill('#email', validFormData.email);
      await page.fill('#message', validFormData.message);
      await page.click('button[type="submit"]');
      
      // Should show error message
      await expect(page.locator('text=Something went wrong')).toBeVisible({ timeout: 5000 });
      
      // Form should remain filled (not reset on error)
      await expect(page.locator('#name')).toHaveValue(validFormData.name);
      await expect(page.locator('#email')).toHaveValue(validFormData.email);
      await expect(page.locator('#message')).toHaveValue(validFormData.message);
    });
  });

  test.describe('Cross-Browser Email Handling', () => {
    test('should maintain email integrity across browsers', async ({ page, browserName }) => {
      const testEmail = `test+${browserName}@example.com`;
      let submittedEmail = '';
      
      await page.route(emailTestConfig.formspreeEndpoint, async (route, request) => {
        const postData = request.postData();
        if (postData) {
          try {
            const data = JSON.parse(postData);
            submittedEmail = data.email;
          } catch (e) {
            console.error('Failed to parse FormSpree data:', e);
          }
        }
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
      });
      
      await page.fill('#name', 'Cross Browser Test');
      await page.fill('#email', testEmail);
      await page.fill('#message', `Testing email integrity in ${browserName}`);
      await page.click('button[type="submit"]');
      
      // Verify the email wasn't modified by browser
      expect(submittedEmail).toBe(testEmail);
      console.log(`${browserName} email integrity test passed:`, submittedEmail);
    });
  });
});